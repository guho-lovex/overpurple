import React, { useEffect, useMemo, useState } from 'react'

export const COLORS_MODE_KEY = 'darkMode'
const hasWindow = typeof window !== `undefined`

export const enum ThemeModeType {
  Dark = 'dark-mode',
  Light = 'light-mode',
}

export const ThemeContext = React.createContext<any>(null)

export const ThemeProvider = ({ children }: any) => {
  const [themeMode, rawSetThemeMode] = useState<string>()

  const darkMode = hasWindow && window.localStorage.getItem(COLORS_MODE_KEY)

  useEffect(() => {
    const initialMode =
      darkMode === 'true' ? ThemeModeType.Dark : ThemeModeType.Light

    rawSetThemeMode(initialMode)
  }, [])

  const contextValue = useMemo(() => {
    function setThemeMode(isDarkMode: boolean) {
      hasWindow && window.localStorage.setItem(COLORS_MODE_KEY, `${isDarkMode}`)

      const mode =
        isDarkMode === true ? ThemeModeType.Dark : ThemeModeType.Light

      document.body.className = window.__theme

      rawSetThemeMode(window.__theme)

      // TODO 需完成window注入，在控制台代码即可切换主题

      return (window.__theme = mode)
    }

    return {
      themeMode,
      setThemeMode,
    }
  }, [themeMode, rawSetThemeMode])

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}
