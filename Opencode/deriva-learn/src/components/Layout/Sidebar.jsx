import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';

const navItems = [
  {
    section: 'Introducción',
    items: [
      { path: '/', label: '¿Qué es una derivada?', icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
      { path: '/definicion', label: 'Definición Formal', icon: 'M4 4h16v16H4zM9 9h6v6H9z' },
      { path: '/geometrica', label: 'Interpretación Geométrica', icon: 'M3 3v18h18' }
    ]
  },
  {
    section: 'Reglas de Derivación',
    items: [
      { path: '/reglas', label: 'Reglas Básicas', icon: 'M3 3h18v18H3zM9 9h6v6H9z' },
      { path: '/producto', label: 'Regla del Producto', icon: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4z' },
      { path: '/cociente', label: 'Regla del Cociente', icon: 'M12 4v16M4 4l8 8-8 8' },
      { path: '/cadena', label: 'Regla de la Cadena', icon: 'M4 4l8 8 8-8' }
    ]
  },
  {
    section: 'Funciones Trigonométricas',
    items: [
      { path: '/trig', label: 'Trigonométricas', icon: 'M4 4v16M4 12h16' },
      { path: '/trig-inversas', label: 'Trig. Inversas', icon: 'M12 2a10 10 0 1 0 10 10' }
    ]
  },
  {
    section: 'Técnicas Avanzadas',
    items: [
      { path: '/implicita', label: 'Diferenciación Implícita', icon: 'M4 4l8 8M12 12l8 8' },
      { path: '/logaritmica', label: 'Diferenciación Logarítmica', icon: 'M4 4h16v16H4zM8 8h8v8H8z' }
    ]
  },
  {
    section: 'Práctica',
    items: [
      { path: '/calculadora', label: 'Calculadora', icon: 'M4 4h16v16H4zM8 8h8v8H8z' },
      { path: '/ejercicios', label: 'Ejercicios', icon: 'M9 11l3 3 3-3M4 8v8M20 8v8' }
    ]
  }
];

export function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState(navItems.map(() => true));

  const toggleSection = (index) => {
    setExpandedSections(prev => {
      const newExpanded = [...prev];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };

  return (
    <>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <svg viewBox="0 0 32 32" fill="currentColor">
              <path d="M16 2L2 9l14 7 14-7-14-7zm0 28L2 23l14 7 14-7-14-7zM2 16l14 7 14-7" fill="none" stroke="currentColor" strokeWidth="2"/>
            </svg>
            DerivaLearn
          </div>
        </div>
        
        <nav className="sidebar-nav">
          {navItems.map((section, idx) => (
            <div className="sidebar-section" key={section.section}>
              <div 
                className="sidebar-section-title"
                onClick={() => toggleSection(idx)}
                style={{ cursor: 'pointer' }}
              >
                {section.section}
              </div>
              {expandedSections[idx] && section.items.map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                  onClick={onClose}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={item.icon} />
                  </svg>
                  {item.label}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
      </aside>
      
      {isOpen && <div className={`overlay ${isOpen ? 'visible' : ''}`} onClick={onClose} />}
    </>
  );
}