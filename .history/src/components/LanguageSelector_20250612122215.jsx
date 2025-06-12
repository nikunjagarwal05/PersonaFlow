import { useEffect } from "react";

const LanguageSelector = () => {
  useEffect(() => {
    const applyStyles = () => {
      const translateCombo = document.querySelector(".goog-te-combo");
      if (translateCombo) {
        const isDark = document.documentElement.classList.contains("dark");

        // Common styles
        translateCombo.style.padding = "6px 12px";
        translateCombo.style.border = "1px solid";
        translateCombo.style.borderRadius = "6px";
        translateCombo.style.fontSize = "14px";
        translateCombo.style.cursor = "pointer";
        translateCombo.style.margin = "0";
        translateCombo.style.outline = "none";
        translateCombo.style.appearance = "none";
        translateCombo.style.width = "160px";
        translateCombo.style.transition = "all 0.3s ease-in-out";

        // Theme specific styles
        if (isDark) {
          translateCombo.style.backgroundColor = "#1f2937"; // gray-800
          translateCombo.style.color = "#f3f4f6"; // gray-100
          translateCombo.style.borderColor = "#4b5563"; // gray-600
        } else {
          translateCombo.style.backgroundColor = "#ffffff"; // white
          translateCombo.style.color = "#1f2937"; // gray-800
          translateCombo.style.borderColor = "#d1d5db"; // gray-300
        }
      }
    };

    const interval = setInterval(() => {
      applyStyles();
    }, 500);

    // Watch for theme toggle
    const observer = new MutationObserver(() => {
      applyStyles();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="google-translate-wrapper mr-3">
      <div id="google_translate_element"></div>
    </div>
  );
};

export default LanguageSelector;
