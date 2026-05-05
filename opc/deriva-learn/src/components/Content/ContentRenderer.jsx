import { useEffect, useRef } from 'react';
import katex from 'katex';
import { contentData } from '../../data/content';
import { useProgress } from '../../context/ProgressContext';

function parseContent(content) {
  const lines = content.trim().split('\n');
  const elements = [];
  let currentText = '';
  let inCode = false;
  let tableRows = [];
  let listItems = [];

  const flushText = () => {
    if (currentText.trim()) {
      elements.push({ type: 'text', content: currentText.trim() });
      currentText = '';
    }
  };

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push({ type: 'list', items: listItems });
      listItems = [];
    }
  };

  const flushTable = () => {
    if (tableRows.length > 0) {
      elements.push({ type: 'table', rows: tableRows });
      tableRows = [];
    }
  };

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (trimmed.startsWith('```')) {
      if (inCode) {
        flushText();
        inCode = false;
      } else {
        flushText();
        flushList();
        inCode = true;
        currentText = '';
      }
      return;
    }

    if (inCode) {
      currentText += trimmed + '\n';
      return;
    }

    if (trimmed.startsWith('## ')) {
      flushText();
      flushList();
      elements.push({ type: 'h2', content: trimmed.slice(3) });
      return;
    }

    if (trimmed.startsWith('### ')) {
      flushText();
      flushList();
      elements.push({ type: 'h3', content: trimmed.slice(4) });
      return;
    }

    if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
      flushText();
      elements.push({ type: 'bold', content: trimmed.slice(2, -2) });
      return;
    }

    if (trimmed.startsWith('|')) {
      const cells = trimmed.split('|').filter(c => c.trim());
      tableRows.push(cells);
      return;
    }

    if (trimmed.startsWith('- ')) {
      flushText();
      listItems.push(trimmed.slice(2));
      return;
    }

    if (trimmed.startsWith('**')) {
      flushText();
      flushList();
      const match = trimmed.match(/\*\*(.+?)\*\*:? (.+)/);
      if (match) {
        elements.push({ type: 'list-item-bold', title: match[1], content: match[2] });
      }
      return;
    }

    if (trimmed.match(/^[0-9]+\. /)) {
      flushText();
      const match = trimmed.match(/^[0-9]+\. (.+)/);
      if (match) {
        listItems.push(match[1]);
      }
      return;
    }

    if (!trimmed) {
      flushText();
      flushList();
      flushTable();
      return;
    }

    currentText += trimmed + '\n';
  });

  flushText();
  flushList();
  flushTable();

  return elements;
}

function processInline(text) {
  const parts = [];
  const pattern = /(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$|\*\*.+?\*\*|\*[^*\n]+?\*)/g;
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', content: text.slice(lastIndex, match.index) });
    }

    const token = match[0];

    if (token.startsWith('$$') && token.endsWith('$$')) {
      parts.push({ type: 'math-display', content: token.slice(2, -2).trim() });
    } else if (token.startsWith('$') && token.endsWith('$')) {
      parts.push({ type: 'math-inline', content: token.slice(1, -1).trim() });
    } else if (token.startsWith('**') && token.endsWith('**')) {
      parts.push({ type: 'bold', content: token.slice(2, -2) });
    } else if (token.startsWith('*') && token.endsWith('*')) {
      parts.push({ type: 'italic', content: token.slice(1, -1) });
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push({ type: 'text', content: text.slice(lastIndex) });
  }

  return parts.filter(part => part.content !== '');
}

function MathComponent({ formula, displayMode }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      try {
        katex.render(formula, containerRef.current, {
          displayMode,
          throwOnError: false,
          delimiters: []
        });
      } catch {
        containerRef.current.textContent = formula;
      }
    }
  }, [formula, displayMode]);

  return (
    <span 
      ref={containerRef} 
      style={{ 
        display: displayMode ? 'block' : 'inline',
        textAlign: displayMode ? 'center' : 'auto',
        margin: displayMode ? '24px 0' : '0 4px'
      }}
    />
  );
}

function MathDisplay({ formula }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      try {
        katex.render(formula, containerRef.current, {
          displayMode: true,
          throwOnError: false
        });
      } catch {
        containerRef.current.textContent = formula;
      }
    }
  }, [formula]);

  return (
    <div 
      ref={containerRef}
      style={{ 
        display: 'block',
        textAlign: 'center',
        margin: '24px 0',
        padding: '20px',
        background: 'var(--surface)',
        borderRadius: '12px',
        overflowX: 'auto'
      }}
    />
  );
}

function InlineContent({ text }) {
  const parts = processInline(text);
  
  return (
    <>
      {parts.map((part, idx) => {
        if (part.type === 'math-inline') {
          return <MathComponent key={idx} formula={part.content} displayMode={false} />;
        }
        if (part.type === 'math-display') {
          return <MathDisplay key={idx} formula={part.content} />;
        }
        if (part.type === 'bold') {
          return <strong key={idx}>{part.content}</strong>;
        }
        if (part.type === 'italic') {
          return <em key={idx}>{part.content}</em>;
        }
        return <span key={idx}>{part.content}</span>;
      })}
    </>
  );
}

function MarkdownRenderer({ content }) {
  const elements = parseContent(content);

  return (
    <div>
      {elements.map((el, idx) => {
        switch (el.type) {
          case 'h2':
            return <h2 key={idx} className="section-title">{el.content}</h2>;
          case 'h3':
            return <h3 key={idx} style={{ marginTop: '24px', marginBottom: '16px' }}>{el.content}</h3>;
          case 'text':
            return (
              <p key={idx} style={{ marginBottom: '16px', lineHeight: '1.8' }}>
                <InlineContent text={el.content} />
              </p>
            );
          case 'bold':
            return <strong key={idx}>{el.content}</strong>;
          case 'list':
            return (
              <ul key={idx} style={{ marginBottom: '16px', paddingLeft: '24px' }}>
                {el.items.map((item, i) => (
                  <li key={i} style={{ marginBottom: '8px', lineHeight: '1.6' }}>
                    <InlineContent text={item} />
                  </li>
                ))}
              </ul>
            );
          case 'list-item-bold':
            return (
              <div key={idx} className="example-box">
                <div className="title">{el.title}</div>
                <div><InlineContent text={el.content} /></div>
              </div>
            );
          case 'table':
            return (
              <div key={idx} style={{ overflowX: 'auto', marginBottom: '24px' }}>
                <table style={{ 
                  width: '100%', 
                  borderCollapse: 'collapse',
                  background: 'var(--surface)',
                  borderRadius: '12px',
                  overflow: 'hidden'
                }}>
                  <tbody>
                    {el.rows.map((row, i) => (
                      <tr key={i} style={{ 
                        background: i === 0 ? 'var(--primary)' : 'transparent',
                        color: i === 0 ? 'white' : 'var(--text-primary)'
                      }}>
                        {row.map((cell, j) => (
                          <td key={j} style={{ 
                            padding: '12px 16px', 
                            borderBottom: i < el.rows.length - 1 ? '1px solid var(--border)' : 'none'
                          }}>
                            <InlineContent text={cell} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

function ContentSection({ path }) {
  const { markComplete } = useProgress();
  
  useEffect(() => {
    markComplete(path.replace('/', '') || 'intro');
  }, [path, markComplete]);

  let data = null;
  
  for (const [, value] of Object.entries(contentData)) {
    const found = value.sections.find(s => s.path === path);
    if (found) {
      data = found;
      break;
    }
  }

  if (!data) {
    return (
      <div className="page-content">
        <h1>Contenido no encontrado</h1>
        <p>La sección que buscas no está disponible.</p>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="section">
        <MarkdownRenderer content={data.content} />
      </div>
      
      <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span className="badge badge-success">
              ✓ Completado
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Content({ path }) {
  return <ContentSection path={path} />;
}
