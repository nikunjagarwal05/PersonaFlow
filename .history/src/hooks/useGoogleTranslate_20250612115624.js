// src/hooks/useGoogleTranslate.js
import { useEffect } from 'react';

const useGoogleTranslate = () => {
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      const script = document.createElement('script');
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        const containerIds = ['google_translate_element', 'google_translate_element_mobile'];
        containerIds.forEach((id) => {
          if (document.getElementById(id)) {
            new window.google.translate.TranslateElement(
              {
                pageLanguage: 'en',
                includedLanguages: 'en,hi,fr,de,es,zh',
                layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
              },
              id
            );
          }
        });
      };
    };

    addGoogleTranslateScript();
  }, []);
};

export default useGoogleTranslate;
