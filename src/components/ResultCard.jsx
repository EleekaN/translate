import React from 'react';

export default function ResultCard({ script, translation, explanation }) {
  if (!script) return null;

  return (
    <div className="result-card">
      <p>🈯 <strong>{script}</strong></p>
      <p>🌍 <strong>{translation}</strong></p>
      <p>📖 {explanation}</p>
    </div>
  );
}
