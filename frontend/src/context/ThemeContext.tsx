import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { PropsWithChildren } from "react";

interface ThemeContextType {
  darkMode: boolean;
  toggleTheme: () => void;
}

const THEME_STORAGE_KEY = "theme";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getInitialDarkMode = () => {
  if (typeof window === "undefined") return false;

  try {
    return window.localStorage.getItem(THEME_STORAGE_KEY) === "dark";
  } catch {
    return false;
  }
};

export const ThemeProvider = ({
  children,
}: PropsWithChildren) => {
  const [darkMode, setDarkMode] = useState(getInitialDarkMode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, darkMode ? "dark" : "light");
    } catch {
      // Theme changes should still work when storage is unavailable.
    }
  }, [darkMode]);

  const toggleTheme = useCallback(() => setDarkMode((current) => !current), []);
  const value = useMemo(() => ({ darkMode, toggleTheme }), [darkMode, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
