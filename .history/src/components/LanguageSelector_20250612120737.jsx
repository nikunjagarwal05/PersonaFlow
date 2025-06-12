import { useEffect } from "react";

const LanguageSelector = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      const translateCombo = document.querySelector(".goog-te-combo");
      if (translateCombo) {
        // Style the dropdown
        translateCombo.style.backgroundColor = "#1f2937"; // Tailwind gray-800
        translateCombo.style.color = "#f3f4f6"; // Tailwind gray-100
        translateCombo.style.padding = "6px 12px";
        translateCombo.style.border = "1px solid #4b5563";
        translateCombo.style.borderRadius = "6px";
        translateCombo.style.fontSize = "14px";
        translateCombo.style.cursor = "pointer";
        translateCombo.style.margin = "0";
        translateCombo.style.outline = "none";
        translateCombo.style.appearance = "none";
        translateCombo.style.width = "160px";
        clearInterval(interval);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="google_translate_element" className="mr-3"></div>
  );
};

export default LanguageSelector;
