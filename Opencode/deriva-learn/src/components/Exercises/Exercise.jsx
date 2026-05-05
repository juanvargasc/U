import { useState } from 'react';

export function Exercise({ question, options, explanation, onComplete }) {
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSelect = (optionId) => {
    if (showResult) return;
    
    setSelected(optionId);
    const correct = options.find(o => o.id === optionId)?.correct || false;
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct && onComplete) {
      onComplete();
    }
  };

  return (
    <div className={`exercise-card ${showResult ? (isCorrect ? 'correct' : 'incorrect') : ''}`}>
      <p style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '20px' }}>
        {question}
      </p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {options.map(option => (
          <button
            key={option.id}
            className={`option-btn ${selected === option.id ? 'selected' : ''} ${
              showResult && option.correct ? 'correct' : ''
            } ${showResult && selected === option.id && !option.correct ? 'incorrect' : ''}`}
            onClick={() => handleSelect(option.id)}
            disabled={showResult}
          >
            {option.text}
          </button>
        ))}
      </div>
      
      {showResult && (
        <div className={`quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
          <strong>{isCorrect ? '¡Correcto!' : 'Incorrecto'}</strong>
          <p style={{ marginTop: '8px', fontWeight: '400' }}>{explanation}</p>
        </div>
      )}
    </div>
  );
}

export function ExerciseCard({ exercise, onComplete }) {
  return (
    <Exercise
      question={exercise.question}
      options={exercise.options}
      explanation={exercise.explanation}
      onComplete={onComplete}
    />
  );
}