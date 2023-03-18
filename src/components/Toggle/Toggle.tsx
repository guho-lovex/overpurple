import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import './toggle.css'
import sunIcon from '../../assets/sun.png'
import moonIcon from '../../assets/moon.png'
import { ThemeContext, ThemeModeType } from '../theme/ThemeContext'

interface ToggleSwitchButtonProps {
  // 黑暗模式情况下的方法 ex： 改变页面样式
  themeMode?: string
  onChange?: any
  icon?: {
    sun: React.ReactNode | React.ReactElement
    dark: React.ReactNode | React.ReactElement
  }
}

export const ToggleSwitchButton: React.FC<ToggleSwitchButtonProps> = ({
  themeMode = ThemeModeType.Light,
  onChange,
  icon = {
    dark: <img src={moonIcon} alt="dark" />,
    sun: <img src={sunIcon} alt="" />,
  },
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const preCheckbox = useRef(false)
  const [hasFocus, setHasFocus] = useState(false)

  useEffect(() => {
    inputRef.current?.checked === preCheckbox.current
  }, [preCheckbox])

  const shadowClassName = useMemo(() => {
    return hasFocus ? `switch-shadow` : ''
  }, [hasFocus])

  useEffect(() => {
    const checked = themeMode === ThemeModeType.Dark ? true : false
    ;((inputRef.current || {}) as any).checked = checked
  }, [themeMode])

  const handleClick = () => {
    // checked: true dark
    const checkbox = inputRef.current

    preCheckbox.current = !!checkbox?.checked
    if (preCheckbox.current === checkbox?.checked) {
      checkbox?.focus()
      checkbox?.click()
      // 黑暗模式
      if (checkbox?.checked) {
        onChange?.(true)
      } else {
        onChange?.(false)
      }
      return
    }
  }

  const handleBlur = () => {
    setHasFocus(false)
  }

  const handleFocus = () => {
    setHasFocus(true)
  }

  return (
    <>
      <div className="toggle-switch" onClick={handleClick}>
        <input
          ref={inputRef}
          type="checkbox"
          className="toggle-switch-checkbox"
          onBlur={handleBlur}
          onFocus={handleFocus}
          aria-label="Switch between Dark and Light mode"
        />
        <div className="toggle-switch-label">
          <span className="toggle-switch-dark">{icon.dark}</span>
          <span className="toggle-switch-sun">{icon.sun}</span>
          <span className={`toggle-switch-switch ${shadowClassName}`} />
        </div>
      </div>
    </>
  )
}

export const ToggleBtn: React.FC<ToggleSwitchButtonProps> = () => {
  const { themeMode, setThemeMode } = useContext(ThemeContext)

  return (
    <ToggleSwitchButton
      themeMode={themeMode}
      onChange={setThemeMode}
    ></ToggleSwitchButton>
  )
}
