import { useEffect } from 'react';

const LanguageSelector = () => {
  useEffect(() => {
    

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
