import { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate, Routes, Route } from 'react-router-dom';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import ContentRenderer from './components/Content/ContentRenderer';
import { Calculator } from './components/Calculator/Calculator';
import { ExerciseCard } from './components/Exercises/Exercise';
import { exerciseData, contentData } from './data/content';
import { useProgress } from './context/ProgressContext';
import { useTheme } from './context/ThemeContext';

function ExercisesPage() {
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  
  const allExercises = useMemo(() => {
    return [
      ...exerciseData.intro,
      ...exerciseData.reglas,
      ...exerciseData.trigonometricas,
      ...exerciseData.implícita
    ];
  }, []);

  useEffect(() => {
    setCurrentQuiz(0);
    setScore(0);
    setShowScore(false);
  }, []);

  const handleComplete = () => {
    setScore(prev => prev + 1);
  };

  const nextQuestion = () => {
    if (currentQuiz < allExercises.length - 1) {
      setCurrentQuiz(prev => prev + 1);
    } else {
      setShowScore(true);
    }
  };

  if (showScore) {
    const percentage = Math.round((score / allExercises.length) * 100);
    return (
      <div className="page-content">
        <div className="quiz-container" style={{ textAlign: 'center' }}>
          <h2 style={{ marginBottom: '24px' }}>¡Quiz Completado!</h2>
          <div style={{ fontSize: '4rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '16px' }}>
            {percentage}%
          </div>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
            {score} de {allExercises.length} respuestas correctas
          </p>
          <button className="btn btn-primary" onClick={() => {
            setScore(0);
            setCurrentQuiz(0);
            setShowScore(false);
          }}>
            Intentar de nuevo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ marginBottom: '8px' }}>Ejercicios Interactivos</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Pregunta {currentQuiz + 1} de {allExercises.length}
          </p>
        </div>
        <div className="badge badge-primary">
          Puntos: {score}
        </div>
      </div>

      <div className="progress-bar" style={{ marginBottom: '32px' }}>
        <div 
          className="progress-fill" 
          style={{ width: `${((currentQuiz + 1) / allExercises.length) * 100}%` }} 
        />
      </div>

      <ExerciseCard
        exercise={allExercises[currentQuiz]}
        onComplete={handleComplete}
      />

      <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
        <button className="btn btn-primary" onClick={nextQuestion}>
          {currentQuiz < allExercises.length - 1 ? 'Siguiente pregunta' : 'Ver resultados'}
        </button>
      </div>
    </div>
  );
}

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toggleTheme, theme } = useTheme();
  const { markComplete, getProgressPercentage } = useProgress();

  const getPageTitle = () => {
    const titles = {
      '/': 'Introducción a las Derivadas',
      '/definicion': 'Definición Formal',
      '/geometrica': 'Interpretación Geométrica',
      '/reglas': 'Reglas de Derivación',
      '/producto': 'Regla del Producto',
      '/cociente': 'Regla del Cociente',
      '/cadena': 'Regla de la Cadena',
      '/trig': 'Funciones Trigonométricas',
      '/trig-inversas': 'Trigonométricas Inversas',
      '/implicita': 'Diferenciación Implícita',
      '/logaritmica': 'Diferenciación Logarítmica',
      '/calculadora': 'Calculadora',
      '/ejercicios': 'Ejercicios'
    };
    return titles[location.pathname] || 'DerivaLearn';
  };

  useEffect(() => {
    const path = location.pathname;
    markComplete(path.replace('/', '') || 'intro');
  }, [location.pathname]);

  useEffect(() => {
    if (sidebarOpen) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);

  const renderContent = () => {
    const path = location.pathname;

    switch (path) {
      case '/calculadora':
        return <div className="page-content"><Calculator /></div>;
      case '/ejercicios':
        return <ExercisesPage />;
      default:
        return <ContentRenderer path={path} />;
    }
  };

  return (
    <div className="layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="main-content">
        <Header 
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)} 
          title={getPageTitle()}
        />
        {renderContent()}
      </main>
      
      <nav className="mobile-nav">
        <div className="mobile-nav-items">
          <button 
            className={`mobile-nav-item ${location.pathname === '/' ? 'active' : ''}`}
            onClick={() => navigate('/')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            Inicio
          </button>
          <button 
            className={`mobile-nav-item ${location.pathname === '/calculadora' ? 'active' : ''}`}
            onClick={() => navigate('/calculadora')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="4" y="2" width="16" height="20" rx="2" />
              <path d="M8 6h8M8 10h8M8 14h4" />
            </svg>
            Calc
          </button>
          <button 
            className={`mobile-nav-item ${location.pathname === '/ejercicios' ? 'active' : ''}`}
            onClick={() => navigate('/ejercicios')}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 11l3 3 3-3M9 5v14M20 8v8" />
            </svg>
            Ejerc
          </button>
          <button 
            className="mobile-nav-item"
            onClick={toggleTheme}
          >
            {theme === 'light' ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2" />
              </svg>
            )}
            Theme
          </button>
        </div>
      </nav>
    </div>
  );
}

export default function App() {
  return <AppContent />;
}