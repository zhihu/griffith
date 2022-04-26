import {css} from 'aphrodite/no-important'
import React, {cloneElement} from 'react'
import {LocaleConfigKey} from '../../constants/locales'
import {useLocaleText} from '../../contexts/LocaleContext'
import useBoolean from '../../hooks/useBoolean'
import styles from '../Controller.styles'

type Props = {
  localeKey: LocaleConfigKey
  hotkey?: string
  children: React.ReactElement
}

const canUseTouch =
  typeof document !== 'undefined' && 'ontouchstart' in document.documentElement

/**
 * ControllerButton
 *
 * `localeKey` 取本地文本，显示为 tooltip，同时设定为 children 的 `aria-label`
 */
const ControllerTooltip: React.FC<Props> = ({localeKey, hotkey, children}) => {
  const text = useLocaleText(localeKey)
  const [isHovered, isHoveredSwitch] = useBoolean()

  return (
    <div
      className={css(styles.menuContainer)}
      onMouseEnter={isHoveredSwitch.on}
      onMouseLeave={isHoveredSwitch.off}
    >
      {cloneElement(children, {'aria-label': text})}
      {!canUseTouch && (
        <div
          className={css(
            styles.menu,
            isHovered && styles.menuShown,
            styles.tooltipContent
          )}
        >
          {text}
          {hotkey && ` (${hotkey})`}
        </div>
      )}
    </div>
  )
}

export default ControllerTooltip
