useEffect(() => {
import useGoogleTranslate from './../../.history/src/hooks/useGoogleTranslate_20250612115318';
  const addGoogleTranslateScript = () => {
    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    window.googleTranslateElementInit = () => {
      if (document.getElementById('google_translate_element')) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,hi,fr,de,es,zh',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          'google_translate_element'
        );
      }
    };
  };

  addGoogleTranslateScript();
}, []);

export default useGoogleTranslate;