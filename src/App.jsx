// import React from 'react';
import './styles.css';
import LoadingSpinner from './components/LoadingSpinner';
import './spinner.css';  // Add this line

import React, { useState, useEffect } from 'react';
import LanguageSelector from './components/LanguageSelector';
import PhraseInput from './components/PhraseInput';
import TranslateButton from './components/TranslateButton';
import ResultCard from './components/ResultCard';

export default function App() {
  const [language, setLanguage] = useState('hindi');
  const [phrase, setPhrase] = useState('');
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);
  const [cache, setCache] = useState({});
  const normalizedPhrase = phrase.trim().toLowerCase();
  const cacheKey = `${normalizedPhrase}-${language}`;


  useEffect(() => {
    const savedCache = localStorage.getItem("translationCache");
    if (savedCache) {
      setCache(JSON.parse(savedCache));
    }
  }, []);

  const clearCache = () => {
    setCache({});
    localStorage.removeItem("translationCache");
  };
  
  
  const handleDelete = (key) => {
    setCache(prevCache => {
      const updatedCache = { ...prevCache };
      delete updatedCache[key];
      return updatedCache;
    });
  };
  

  const handleTranslate = async () => {
    // console.log("Sending request...");
    setLoading(true);
    setResult({});
    if (cache[cacheKey]) {
      setResult(cache[cacheKey]);
      setLoading(false);
      setPhrase('');
      return;
    }
    // const API_BASE = process.env.REACT_APP_API_URL;
    // const response = await fetch(`${API_BASE}/translate`, {

    const response = await fetch("https://translate-backend-zesc.onrender.com/translate", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phrase, language }),
    });
    const data = await response.json();
    console.log("got response:", data);
    setResult(data);
    setLoading(false);
    setPhrase('');
    // setCache(prev => ({ ...prev, [cacheKey]:data}))

    setCache(prev => {
      const updated = { ...prev, [cacheKey]: data };
      localStorage.setItem("translationCache", JSON.stringify(updated));
      return updated;
    });

  };

  return (
    <div className="container">
      <h1>🌐 Language Learner</h1>
      <LanguageSelector language={language} onChange={(e) => setLanguage(e.target.value)} />
      <PhraseInput phrase={phrase} onChange={(e) => setPhrase(e.target.value)} />
      <TranslateButton onClick={handleTranslate} />
      <hr />
      {loading ? <LoadingSpinner /> : <ResultCard {...result} />}

    
<div className="history-section">
  <div className="history-header">
    <h2>🕘 Translation History</h2>
    <button className="clear-btn" onClick={clearCache}>🗑️ Clear History</button>
  </div>
  <ul className="history-list">
    {Object.entries(cache).map(([key, result]) => (
      <li key={key} onClick={() => setResult(result)} className="history-item">
        <span className="history-phrase">{key.split("-")[0]}</span>
        <span className="history-lang">({key.split("-")[1]})</span>
      <button 
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(key);
          }}
          className="delete-btn"
          >
        ❌
      </button>
      </li>
    ))}
  </ul>
</div>
     
    </div>
  );  
}