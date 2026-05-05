import { createContext, useContext, useState, useEffect } from 'react';

const ProgressContext = createContext();

const SECTIONS = [
  'intro',
  'definicion-formal',
  'interpretacion-geometrica',
  'reglas',
  'regla-producto',
  'regla-cociente',
  'regla-cadena',
  'trigonométricas',
  'trig-inversas',
  'implícita',
  'logarítmica',
  'calculadora',
  'ejercicios'
];

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('deriva-learn-progress');
    return saved ? JSON.parse(saved) : {};
  });

  const [completedSections, setCompletedSections] = useState(() => {
    const saved = localStorage.getItem('deriva-learn-completed');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('deriva-learn-progress', JSON.stringify(progress));
    localStorage.setItem('deriva-learn-completed', JSON.stringify(completedSections));
  }, [progress, completedSections]);

  const updateProgress = (section, percentage) => {
    setProgress(prev => ({ ...prev, [section]: percentage }));
  };

  const markComplete = (section) => {
    if (!completedSections.includes(section)) {
      setCompletedSections(prev => [...prev, section]);
    }
  };

  const getProgressPercentage = () => {
    const completed = completedSections.length;
    return Math.round((completed / SECTIONS.length) * 100);
  };

  const isSectionComplete = (section) => {
    return completedSections.includes(section);
  };

  const resetProgress = () => {
    setProgress({});
    setCompletedSections([]);
    localStorage.removeItem('deriva-learn-progress');
    localStorage.removeItem('deriva-learn-completed');
  };

  return (
    <ProgressContext.Provider value={{
      progress,
      updateProgress,
      markComplete,
      resetProgress,
      getProgressPercentage,
      isSectionComplete,
      completedSections,
      sections: SECTIONS
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
