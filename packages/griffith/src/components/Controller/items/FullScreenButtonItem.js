import React from 'react'
import {css} from 'aphrodite/no-important'
import styles from '../styles'
import Icon from '../../Icon'
import * as icons from '../../Icon/icons/controller'
import Tooltip from '../../Tooltip'
import Hover from '../../Hover'

const FullScreenButtonItem = ({isFullScreen, onClick}) => (
  <Hover className={css(styles.menuContainer)}>
    {isFullScreenHovered => (
      <React.Fragment>
        <button className={css(styles.button)} onClick={onClick}>
          <Icon icon={isFullScreen ? icons.smallscreen : icons.fullscreen} />
        </button>
        <div
          className={css(
            styles.fullScreenTooltip,
            styles.menu,
            isFullScreenHovered && styles.menuShown,
            isFullScreen && styles.fullScreenTooltipWide
          )}
        >
          <Tooltip
            content={
              isFullScreen
                ? 'action-exit-fullscreen'
                : 'action-enter-fullscreen'
            }
          />
        </div>
      </React.Fragment>
    )}
  </Hover>
)

export default FullScreenButtonItem
