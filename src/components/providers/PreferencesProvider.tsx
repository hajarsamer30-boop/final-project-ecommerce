"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { translations, type Language, type TranslationKey } from "@/lib/i18n";

type Theme = "light" | "dark";

type PreferencesContextValue = {
  language: Language;
  theme: Theme;
  setLanguage: (language: Language) => void;
  setTheme: (theme: Theme) => void;
  t: (key: TranslationKey) => string;
};

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

function applyPreferences(language: Language, theme: Theme) {
  const root = document.documentElement;
  root.lang = language;
  root.dir = language === "ar" ? "rtl" : "ltr";
  root.dataset.theme = theme;
  root.classList.toggle("dark", theme === "dark");
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [language, updateLanguage] = useState<Language>("en");
  const [theme, updateTheme] = useState<Theme>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("freshcart-language");
    const savedTheme = window.localStorage.getItem("freshcart-theme");
    const initialLanguage: Language = savedLanguage === "ar" ? "ar" : "en";
    const initialTheme: Theme =
      savedTheme === "dark" || savedTheme === "light"
        ? savedTheme
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";

    updateLanguage(initialLanguage);
    updateTheme(initialTheme);
    applyPreferences(initialLanguage, initialTheme);
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) applyPreferences(language, theme);
  }, [language, theme, ready]);

  const setLanguage = useCallback((nextLanguage: Language) => {
    window.localStorage.setItem("freshcart-language", nextLanguage);
    updateLanguage(nextLanguage);
  }, []);

  const setTheme = useCallback((nextTheme: Theme) => {
    window.localStorage.setItem("freshcart-theme", nextTheme);
    updateTheme(nextTheme);
  }, []);

  const t = useCallback(
    (key: TranslationKey) => translations[language][key] ?? translations.en[key],
    [language],
  );

  return (
    <PreferencesContext.Provider value={{ language, theme, setLanguage, setTheme, t }}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error("usePreferences must be used inside PreferencesProvider");
  }
  return context;
}
