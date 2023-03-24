import React, { useEffect, useMemo, useState } from 'react';
import { hasWindow, ThemeModeType } from '../config';

export const ThemeContext = React.createContext<any>(null);

export const ThemeProvider = ({ children }: any) => {
  const [themeMode, setThemeMode] = useState<string>();

  useEffect(() => {
    const localDarkMode = window.localStorage.getItem('themeMode');

    if (localDarkMode) {
      setThemeMode(localDarkMode);
    } else {
      const isDarkMode = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      setThemeMode(isDarkMode ? ThemeModeType.Dark : ThemeModeType.Light);
    }
  }, []);

  const contextValue = useMemo(() => {
    const toggleTheme = (isDakMode: boolean) => {
      const newTheme = !isDakMode ? ThemeModeType.Light : ThemeModeType.Dark;
      setThemeMode(newTheme);
      window.localStorage.setItem('themeMode', newTheme);
      document.body.className = newTheme;

      if (hasWindow) {
        window.__theme = newTheme;
      }
    };

    return {
      themeMode,
      toggleTheme,
    };
  }, [themeMode, setThemeMode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
