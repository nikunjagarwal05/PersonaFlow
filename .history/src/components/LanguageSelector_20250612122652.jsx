import { useEffect } from "react";

const LanguageSelector = () => {
  useEffect(() => {
    const applyStyles = () => {
      const combo = document.querySelector(".goog-te-combo");
      if (!combo) return;

      const isDark = document.documentElement.classList.contains("dark");

      combo.style.backgroundColor = isDark ? "#1f2937" : "#ffffff"; // Tailwind gray-800 / white
      combo.style.color = isDark ? "#f3f4f6" : "#1f2937"; // gray-100 / gray-800
      combo.style.padding = "6px 12px";
      combo.style.border = `1px solid ${isDark ? "#4b5563" : "#d1d5db"}`; // gray-600 / gray-300
      combo.style.borderRadius = "0.375rem"; // rounded-md
      combo.style.fontSize = "0.875rem"; // text-sm
      combo.style.cursor = "pointer";
      combo.style.width = "160px";
      combo.style.outline = "none";
      combo.style.appearance = "none";
    };

    // Retry until the element loads
    const interval = setInterval(() => {
      const combo = document.querySelector(".goog-te-combo");
      if (combo) {
        applyStyles();
        clearInterval(interval);
      }
    }, 300);

    // Also re-style on theme change
    const observer = new MutationObserver(() => {
      applyStyles();
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  return (
    <div id="google_translate_element" className="mr-3" />
  );
};

export default LanguageSelector;
