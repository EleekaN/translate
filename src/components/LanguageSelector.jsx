import React from 'react';

export default function LanguageSelector({ language, onChange }) {
  return (
    <div className="mb-4">
      <label>Select Language:</label>
      <select value={language} onChange={onChange} className="input">
        <option value="hindi">Hindi</option>
        <option value="assamese">Assamese</option>
      </select>
    </div>
  );
}

