import { useTheme } from '../../context/ThemeContext';
import { useProgress } from '../../context/ProgressContext';

export function Header({ onMenuToggle, title }) {
  const { theme, toggleTheme } = useTheme();
  const { getProgressPercentage, resetProgress } = useProgress();
  
  const progress = getProgressPercentage();

  const handleResetProgress = () => {
    const shouldReset = window.confirm('¿Quieres reiniciar todo tu progreso?');

    if (shouldReset) {
      resetProgress();
    }
  };

  return (
    <header className="header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button className="menu-toggle" onClick={onMenuToggle} aria-label="Toggle menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
        <h1 className="header-title">{title}</h1>
      </div>
      
      <div className="header-actions">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            Progreso: {progress}%
          </span>
          <div className="progress-bar" style={{ width: '100px' }}>
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <button
            className="reset-progress-btn"
            onClick={handleResetProgress}
            aria-label="Reiniciar progreso"
            title="Reiniciar progreso"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 3-6.7" />
              <path d="M3 4v6h6" />
            </svg>
          </button>
        </div>
        
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {theme === 'light' ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}
