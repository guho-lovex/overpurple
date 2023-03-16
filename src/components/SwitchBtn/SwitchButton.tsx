import React, { useEffect, useMemo, useRef, useState } from 'react'
import './switchBtn.css'
import sunIcon from '../../assets/sun.png'
import moonIcon from '../../assets/moon.png'

interface ToggleSwitchButtonProps {
  icon?: {
    sun: string
    dark: string
  }
}

export const ToggleSwitchButton: React.FC<ToggleSwitchButtonProps> = props => {
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
        />
        <div className="toggle-switch-label">
          <span className="toggle-switch-dark">
            <img src={moonIcon} alt="" />
          </span>
          <span className="toggle-switch-sun">
            <img src={sunIcon} alt="" />
          </span>
          <span className={`toggle-switch-switch ${shadowClassName}`} />
        </div>
      </div>
    </>
  )
}
