import React from 'react';

export default function TranslateButton({ onClick }) {
  return (
    <button className="btn-primary" onClick={onClick}>
      Translate & Explain ✨
    </button>
  );
}
