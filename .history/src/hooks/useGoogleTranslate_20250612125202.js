import { useEffect } from 'react';

const useGoogleTranslate = () => {

    useEffect(() => {
        const existingScript = document.getElementById('google-translate-script');
        const existingElement = document.getElementById('google_translate_element');

        // Avoid re-adding script if already loaded
        if (!existingScript) {
        const script = document.createElement('script');
        script.id = 'google-translate-script';
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.body.appendChild(script);
        }

        // Init callback must be defined *before* script loads
        window.googleTranslateElementInit = () => {
            if (existingElement && !existingElement.innerHTML.trim()) {
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
    }, []);
};

export default useGoogleTranslate;
