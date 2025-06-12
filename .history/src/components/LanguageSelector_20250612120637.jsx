import { useEffect } from "react";

const LanguageSelector = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      const combo = document.querySelector(".goog-te-combo");
      if (combo) {
        combo.style.backgroundColor = "#1f2937";
        combo.style.color = "#c0c0c0";
        combo.style.padding = "8px 12px";
        combo.style.border = "1px solid #4b5563";
        combo.style.borderRadius = "8px";
        combo.style.fontSize = "14px";
        combo.style.cursor = "pointer";
        combo.style.margin = "0";
        combo.style.outline = "none";
        combo.style.appearance = "none";
        clearInterval(interval);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="google_translate_element" className="translate-container"></div>
  );
};

export default LanguageSelector;
