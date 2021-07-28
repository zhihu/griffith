import React, {useState} from 'react'
import {css} from 'aphrodite/no-important'
import {SPEEDS, SPEEDS_DISPLAY_NAME} from '../../../constants/Speeds'
import styles from '../styles'

const SpeedButtonItem = ({speed = SPEEDS.ONE_X, onChange}) => {
  const [isSpeedHovered, setIsSpeedHovered] = useState(false)

  const handleSpeedPointerEnter = () => {
    setIsSpeedHovered(true)
  }

  const handleSpeedPointerLeave = () => {
    setIsSpeedHovered(false)
  }

  return (
    <div
      className={css(styles.menuContainer)}
      onMouseEnter={handleSpeedPointerEnter}
      onMouseLeave={handleSpeedPointerLeave}
    >
      <button className={css(styles.button, styles.qualityButton)}>
        <span className={css(styles.qualityButtonText)}>
          {speed === SPEEDS.ONE_X ? '倍速' : SPEEDS_DISPLAY_NAME.get(speed)}
        </span>
      </button>
      <div className={css(styles.menu, isSpeedHovered && styles.menuShown)}>
        <div className={css(styles.speedMenu)}>
          {Array.from(SPEEDS_DISPLAY_NAME).map(([key, label]) => (
            <button
              key={key}
              className={css(
                styles.speedMenuItem,
                speed === key && styles.speedMenuActiveItem
              )}
              onClick={() => onChange(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SpeedButtonItem
