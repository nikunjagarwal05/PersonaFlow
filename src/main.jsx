import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Add Google Translate script
const script = document.createElement('script');
script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
script.async = true;
document.head.appendChild(script);

// Initialize Google Translate
window.googleTranslateElementInit = function() {
  new window.google.translate.TranslateElement(
    {
      pageLanguage: 'en',
      includedLanguages: 'en,hi,fr,de,es,zh',
      layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
      autoDisplay: false,
    },
    'google_translate_element'
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);