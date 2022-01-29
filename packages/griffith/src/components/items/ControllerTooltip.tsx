import React from 'react'
import {css} from 'aphrodite/no-important'
import {LocaleConfigKey} from '../../constants/locales'
import useBoolean from '../../hooks/useBoolean'
import TranslatedText from '../TranslatedText'
import styles from '../Controller.styles'

type Props = {
  content: LocaleConfigKey
}

const canUseTouch =
  typeof document !== 'undefined' && 'ontouchstart' in document.body

const ControllerTooltip: React.FC<Props> = ({content, children}) => {
  const [isHovered, isHoveredSwitch] = useBoolean()

  return (
    <div
      className={css(styles.menuContainer)}
      onMouseEnter={isHoveredSwitch.on}
      onMouseLeave={isHoveredSwitch.off}
    >
      {children}
      {!canUseTouch && (
        <div
          className={css(
            styles.menu,
            isHovered && styles.menuShown,
            styles.tooltipContent
          )}
        >
          <TranslatedText name={content} />
        </div>
      )}
    </div>
  )
}

export default ControllerTooltip
