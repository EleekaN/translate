import React from 'react';

export default function PhraseInput({ phrase, onChange }) {
  return (
    <div className="mb-4">
      <label>Enter phrase:</label>
      <input
        type="text"
        value={phrase}
        onChange={onChange}
        placeholder="e.g., tum kaise ho"
        className="input"
      />
    </div>
  );
}
