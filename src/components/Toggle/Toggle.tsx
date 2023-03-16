import React, { useEffect, useMemo, useRef, useState } from 'react'
import './toggle.css'
import sunIcon from '../../assets/sun.png'
import moonIcon from '../../assets/moon.png'

interface ToggleSwitchButtonProps {
  icon?: {
    sun: React.ReactNode | React.ReactElement
    dark: React.ReactNode | React.ReactElement
  }
}

export const ToggleSwitchButton: React.FC<ToggleSwitchButtonProps> = ({
  icon = {
    dark: <img src={moonIcon} alt="dark" />,
    sun: <img src={sunIcon} alt="" />,
  },
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const newRef = useRef<HTMLInputElement>(null)
  const preCheckbox = useRef(false)
  const [hasFocus, setHasFocus] = useState(false)

  useEffect(() => {
    inputRef.current?.checked === preCheckbox.current
  }, [preCheckbox])

  const shadowClassName = useMemo(() => {
    return hasFocus ? `switch-shadow` : ''
  }, [hasFocus])

  const handleClick = () => {
    // checked: true dark
    const checkbox = inputRef.current
    const a = newRef.current
    preCheckbox.current = !!checkbox?.checked
    if (preCheckbox.current === checkbox?.checked) {
      a?.focus()
      checkbox?.focus()
      checkbox?.click()
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
  return <ToggleSwitchButton></ToggleSwitchButton>
}
