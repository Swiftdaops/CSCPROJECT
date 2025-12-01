import { useCallback, useEffect, useState } from "react";

// Hook: applies classes to elements marked with .light or .dark according to
// their data-light / data-dark attributes. Persists theme in localStorage
// under `storageKey` and toggles document.documentElement 'dark' class.
export default function useThemedClasses(storageKey = "site-theme") {
  const getInitial = () => {
    if (typeof window === "undefined") return "light";
    const saved = localStorage.getItem(storageKey);
    if (saved) return saved;
    return document.documentElement.classList.contains("dark") ? "dark" : "light";
  };

  const [theme, setThemeState] = useState(getInitial);

  const applyToMarked = useCallback(
    (t) => {
      if (typeof document === "undefined") return;
      // toggle html class for Tailwind dark mode integration
      document.documentElement.classList.toggle("dark", t === "dark");

      document.querySelectorAll(".light, .dark").forEach((el) => {
        const lightClasses = (el.dataset.light || "").trim();
        const darkClasses = (el.dataset.dark || "").trim();

        // remove both sets first (if present)
        if (lightClasses) el.classList.remove(...lightClasses.split(/\s+/));
        if (darkClasses) el.classList.remove(...darkClasses.split(/\s+/));

        // add the correct classes
        if (t === "dark" && darkClasses) el.classList.add(...darkClasses.split(/\s+/));
        if (t === "light" && lightClasses) el.classList.add(...lightClasses.split(/\s+/));
      });
    },
    []
  );

  useEffect(() => {
    applyToMarked(theme);
    // listen for storage changes in other tabs
    function onStorage(e) {
      if (e.key === storageKey && e.newValue) setThemeState(e.newValue);
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [theme, applyToMarked, storageKey]);

  // Observe changes to <html class="..."> so external theme toggles
  // (e.g. your ThemeProvider toggling document.documentElement.classList)
  // will cause the hook to re-apply the correct per-element classes.
  useEffect(() => {
    if (typeof document === "undefined") return;
    const docEl = document.documentElement;
    const observer = new MutationObserver(() => {
      const t = docEl.classList.contains("dark") ? "dark" : "light";
      setThemeState(t);
      applyToMarked(t);
    });

    observer.observe(docEl, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [applyToMarked]);

  const setTheme = useCallback(
    (t) => {
      localStorage.setItem(storageKey, t);
      setThemeState(t);
      applyToMarked(t);
    },
    [applyToMarked, storageKey]
  );

  const toggle = useCallback(() => setTheme(theme === "dark" ? "light" : "dark"), [setTheme, theme]);

  return { theme, setTheme, toggle };
}
