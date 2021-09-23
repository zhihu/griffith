import React from 'react'
import {css} from 'aphrodite/no-important'
import {ua} from 'griffith-utils'
import styles from '../Controller.styles'
import * as icons from '../icons/controller'
import Tooltip from '../Tooltip'
import Hover from '../Hover'
import ControllerButton from './ControllerButton'

const {isMobile} = ua

const PageFullScreenButtonItem: React.FC<{
  isFullScreen: boolean
  onClick: React.HTMLAttributes<HTMLButtonElement>['onClick'] | (() => void)
}> = ({isFullScreen, onClick}) => (
  <Hover className={css(styles.menuContainer)}>
    {(isFullScreenHovered) => (
      <>
        <ControllerButton
          icon={isFullScreen ? icons.exitPageScreen : icons.enterPageScreen}
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
                  ? 'action-exit-page-fullscreen'
                  : 'action-enter-page-fullscreen'
              }
            />
          )}
        </div>
      </>
    )}
  </Hover>
)

export default PageFullScreenButtonItem
