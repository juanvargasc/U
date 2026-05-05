import { useState, useEffect, useRef } from 'react';
import * as math from 'mathjs';

const examples = [
  { label: 'x^2', formula: 'x^2' },
  { label: 'x^3 + 2x', formula: 'x^3 + 2*x' },
  { label: 'sin(x)', formula: 'sin(x)' },
  { label: 'x^2 * sin(x)', formula: 'x^2 * sin(x)' },
  { label: 'exp(x)', formula: 'exp(x)' },
  { label: 'ln(x)', formula: 'log(x)' },
  { label: 'sqrt(x)', formula: 'sqrt(x)' }
];

const functionPlot = window.functionPlot || null;

export function Calculator() {
  const [input, setInput] = useState('x^2');
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);
  const [error, setError] = useState('');
  const [showSteps, setShowSteps] = useState(false);
  const graphRef = useRef(null);
  const [derivativeData, setDerivativeData] = useState(null);

  const differentiate = (expr) => {
    try {
      setError('');
      const parsed = math.parse(expr);
      const derivative = math.derivative(parsed, 'x');
      
      const resultStr = derivative.toString();
      setResult(resultStr);
      
      setSteps([
        { step: 1, text: `Función original: f(x) = ${expr}` },
        { step: 2, text: `Aplicar reglas de derivación` },
        { step: 3, text: `f'(x) = ${resultStr}` }
      ]);

      return resultStr;
    } catch (err) {
      setError('Error al derivar. Verifica la sintaxis de la función.');
      setResult(null);
      setSteps([]);
      return null;
    }
  };

  const evaluateFunction = (expr, xVal) => {
    try {
      return math.evaluate(expr, { x: xVal });
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const deriv = differentiate(input);
    if (deriv) {
      setDerivativeData({ original: input, derivative: deriv });
    }
  }, [input]);

  useEffect(() => {
    if (!graphRef.current || !derivativeData) return;

    const range = { min: -10, max: 10 };
    
    const f1 = (x) => evaluateFunction(derivativeData.original, x);
    const f2 = (x) => evaluateFunction(derivativeData.derivative, x);

    if (graphRef.current && typeof window.functionPlot === 'function') {
      try {
        window.functionPlot({
          target: graphRef.current,
          width: graphRef.current.offsetWidth,
          height: 400,
          xAxis: { domain: [-5, 5] },
          yAxis: { domain: [-10, 10] },
          grid: true,
          data: [
            {
              fn: derivativeData.original,
              color: '#4F46E5',
              name: 'f(x)'
            },
            {
              fn: derivativeData.derivative,
              color: '#8B5CF6',
              name: "f'(x)"
            }
          ]
        });
      } catch (e) {
        console.log('Graph rendering skipped');
      }
    }
  }, [derivativeData]);

  return (
    <div className="calculator">
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ marginBottom: '8px' }}>Calculadora de Derivadas</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Ingresa una función y veamos su derivada. Soporta: polinomios, funciones trigonométricas, exponenciales y más.
        </p>
      </div>

      <div style={{ marginBottom: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {examples.map((ex, idx) => (
          <button
            key={idx}
            className="btn btn-ghost"
            onClick={() => setInput(ex.formula)}
            style={{ fontSize: '0.875rem', padding: '8px 12px' }}
          >
            {ex.label}
          </button>
        ))}
      </div>

      <div className="calculator-input">
        <input
          type="text"
          className="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ingresa una función, ej: x^2 + sin(x)"
          onKeyDown={(e) => e.key === 'Enter' && differentiate(input)}
        />
        <button 
          className="btn btn-primary"
          onClick={() => differentiate(input)}
        >
          Derivar
        </button>
      </div>

      {error && (
        <div style={{ 
          padding: '16px', 
          background: 'rgba(239, 68, 68, 0.1)', 
          color: 'var(--error)',
          borderRadius: '8px',
          marginBottom: '24px'
        }}>
          {error}
        </div>
      )}

      {result && (
        <>
          <div className="calculator-result">
            <div className="label">Resultado</div>
            <div className="result">f'(x) = {result}</div>
          </div>

          <button 
            className="btn btn-secondary"
            onClick={() => setShowSteps(!showSteps)}
            style={{ marginBottom: '16px' }}
          >
            {showSteps ? 'Ocultar' : 'Ver'} pasos
          </button>

          {showSteps && steps.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              {steps.map((step, idx) => (
                <div key={idx} className="step-box">
                  <div className="step-number">{step.step}</div>
                  <div className="step-content">{step.text}</div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      <div style={{ marginTop: '32px' }}>
        <h3 style={{ marginBottom: '16px' }}>Gráfica</h3>
        <div 
          className="graph-container" 
          ref={graphRef}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            background: 'var(--surface)',
            color: 'var(--text-secondary)'
          }}
        >
          {derivativeData ? (
            <div style={{ width: '100%', height: '400px', position: 'relative' }}>
              <div style={{ 
                position: 'absolute', 
                top: '50%', 
                left: '0', 
                right: '0', 
                height: '2px', 
                background: 'var(--border)' 
              }} />
              <div style={{ 
                position: 'absolute', 
                top: '0', 
                bottom: '50%', 
                width: '2px', 
                background: 'var(--border)',
                left: '50%'
              }} />
              <canvas 
                ref={(canvas) => {
                  if (canvas) {
                    const ctx = canvas.getContext('2d');
                    const width = canvas.width = canvas.offsetWidth;
                    const height = canvas.height = 400;
                    
                    ctx.clearRect(0, 0, width, height);
                    
                    const scale = 30;
                    const offsetX = width / 2;
                    const offsetY = height / 2;
                    
                    ctx.strokeStyle = 'var(--border)';
                    ctx.beginPath();
                    ctx.moveTo(0, offsetY);
                    ctx.lineTo(width, offsetY);
                    ctx.moveTo(offsetX, 0);
                    ctx.lineTo(offsetX, height);
                    ctx.stroke();
                    
                    ctx.strokeStyle = '#4F46E5';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    for (let x = -offsetX / scale; x < offsetX / scale; x += 0.1) {
                      const y = evaluateFunction(derivativeData.original, x);
                      if (y !== null && !isNaN(y)) {
                        const pixelX = offsetX + x * scale;
                        const pixelY = offsetY - y * scale;
                        if (x === -offsetX / scale) {
                          ctx.moveTo(pixelX, pixelY);
                        } else {
                          ctx.lineTo(pixelX, pixelY);
                        }
                      }
                    }
                    ctx.stroke();
                    
                    ctx.strokeStyle = '#8B5CF6';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    for (let x = -offsetX / scale; x < offsetX / scale; x += 0.1) {
                      const y = evaluateFunction(derivativeData.derivative, x);
                      if (y !== null && !isNaN(y)) {
                        const pixelX = offsetX + x * scale;
                        const pixelY = offsetY - y * scale;
                        if (x === -offsetX / scale) {
                          ctx.moveTo(pixelX, pixelY);
                        } else {
                          ctx.lineTo(pixelX, pixelY);
                        }
                      }
                    }
                    ctx.stroke();
                  }
                }}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          ) : (
            <p>Ingresa una función para ver la gráfica</p>
          )}
        </div>
        
        <div style={{ display: 'flex', gap: '24px', marginTop: '16px', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '16px', height: '4px', background: '#4F46E5', borderRadius: '2px' }} />
            <span style={{ fontSize: '0.875rem' }}>f(x)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '16px', height: '4px', background: '#8B5CF6', borderRadius: '2px' }} />
            <span style={{ fontSize: '0.875rem' }}>f'(x)</span>
          </div>
        </div>
      </div>
    </div>
  );
}