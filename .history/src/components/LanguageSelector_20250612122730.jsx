import { useEffect } from 'react';

const LanguageSelector = () => {
  useEffect(() => {
    const applyComboStyles = () => {
      const combo = document.querySelector('.goog-te-combo');
      if (!combo) return;

      const isDark = document.documentElement.classList.contains('dark');

      combo.style.backgroundColor = isDark ? '#1f2937' : '#f9fafb'; // dark: gray-800, light: gray-100
      combo.style.color = isDark ? '#f3f4f6' : '#1f2937'; // dark: gray-100, light: gray-800
      combo.style.border = 'none';
      combo.style.padding = '6px 12px';
      combo.style.borderRadius = '6px';
      combo.style.fontSize = '14px';
      combo.style.cursor = 'pointer';
      combo.style.outline = 'none';
      combo.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
      combo.style.width = '160px';
    };

    const interval = setInterval(() => {
      const combo = document.querySelector('.goog-te-combo');
      if (combo) {
        applyComboStyles();
        clearInterval(interval);
      }
    }, 300);

    const observer = new MutationObserver(() => {
      applyComboStyles(); // Update on theme switch
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  return <div id="google_translate_element" className="mr-3" />;
};

export default LanguageSelector;
