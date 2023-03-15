import React from 'react'
import './switchBtn.css'

interface ToggleSwitchButtonProps {
  id: string
  checked?: boolean
  onChange?: (arg: any) => void
  icon?: {
    sun: string
    dark: string
  }
}

export const ToggleSwitchButton: React.FC<ToggleSwitchButtonProps> = props => {
  const { id, checked, onChange, icon = { sun: '☀', dark: '☾' } } = props
  const handleClick = () => {
    console.log('------handleClick')
  }
  const handleTouchClick = () => {
    console.log('------handleTouchClick')
  }

  return (
    <div
      className="toggle-switch"
      onClick={handleClick}
      onTouchStart={handleTouchClick}
    >
      <input
        type="checkbox"
        className="toggle-switch-checkbox"
        checked={checked}
        onChange={e => onChange?.(e.target.checked)}
      />
      {id ? (
        <label className="toggle-switch-label" htmlFor={props.id}>
          <span
            className="toggle-switch-inner"
            data-dark-icon={icon?.dark}
            data-sun-icon={icon?.sun}
          ></span>
          <span className="toggle-switch-switch"></span>
        </label>
      ) : null}
    </div>
  )
}
