import { useEffect } from "react";

const LanguageSelector = () => {
  useEffect(() => {
    const applyThemeToDropdown = () => {
      const translateCombo = document.querySelector(".goog-te-combo");
      if (!translateCombo) return;

      // Remove all previously set styles
      translateCombo.removeAttribute("style");

      // Detect theme
      const isDark = document.documentElement.classList.contains("dark");

      // Apply Tailwind-like styles based on theme
      translateCombo.style.backgroundColor = isDark ? "#1f2937" : "#ffffff"; // gray-800 / white
      translateCombo.style.color = isDark ? "#f3f4f6" : "#1f2937"; // gray-100 / gray-800
      translateCombo.style.padding = "6px 12px";
      translateCombo.style.border = "1px solid";
      translateCombo.style.borderColor = isDark ? "#4b5563" : "#d1d5db"; // gray-600 / gray-300
      translateCombo.style.borderRadius = "0.375rem"; // rounded-md
      translateCombo.style.fontSize = "0.875rem"; // text-sm
      translateCombo.style.cursor = "pointer";
      translateCombo.style.width = "160px";
    };

    const interval = setInterval(() => {
      applyThemeToDropdown();
      if (document.querySelector(".goog-te-combo")) clearInterval(interval);
    }, 300);

    // Watch for theme changes
    const observer = new MutationObserver(applyThemeToDropdown);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  return <div id="google_translate_element" className="mr-3" />;
};

export default LanguageSelector;
