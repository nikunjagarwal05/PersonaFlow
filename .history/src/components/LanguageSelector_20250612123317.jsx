import { useEffect } from 'react';

const LanguageSelector = () => {
  useEffect(() => {

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
