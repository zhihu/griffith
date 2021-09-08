import React from 'react'
import {css} from 'aphrodite/no-important'
import {ua} from 'griffith-utils'
import styles from '../Controller.styles'
import Icon from '../Icon'
import * as icons from '../icons/controller'
import Tooltip from '../Tooltip'
import Hover from '../Hover'

const {isMobile} = ua

const PageFullScreenButtonItem = ({isFullScreen, onClick}: any) => (
  // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
  <Hover className={css(styles.menuContainer)}>
    {(isFullScreenHovered: any) => (
      <React.Fragment>
        <button className={css(styles.button)} onClick={onClick}>
          <Icon
            icon={isFullScreen ? icons.exitPageScreen : icons.enterPageScreen}
          />
        </button>
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
      </React.Fragment>
    )}
  </Hover>
)

export default PageFullScreenButtonItem
