import React from 'react'
import {css} from 'aphrodite/no-important'
import {ua} from 'griffith-utils'
import styles from '../Controller.styles'
import * as icons from '../icons/controller'
import Tooltip from '../Tooltip'
import Hover from '../Hover'
import ControllerButton from './ControllerButton'

const {isMobile} = ua

const FullScreenButtonItem: React.FC<{
  isFullScreen: boolean
  onClick: React.HTMLAttributes<HTMLButtonElement>['onClick']
}> = ({isFullScreen, onClick}) => (
  <Hover className={css(styles.menuContainer)}>
    {(isFullScreenHovered: any) => (
      <>
        <ControllerButton
          icon={isFullScreen ? icons.smallscreen : icons.fullscreen}
          onClick={onClick}
        />
        <div
          className={css(
            styles.fullScreenTooltip,
            styles.menu,
            isFullScreenHovered && styles.menuShown,
            isFullScreen && styles.fullScreenTooltipWide
          )}
        >
          {!isMobile && (
            <Tooltip
              content={
                isFullScreen
                  ? 'action-exit-fullscreen'
                  : 'action-enter-fullscreen'
              }
            />
          )}
        </div>
      </>
    )}
  </Hover>
)

export default FullScreenButtonItem
