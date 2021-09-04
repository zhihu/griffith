import React from 'react'
import {css} from 'aphrodite/no-important'
import {ua} from 'griffith-utils'
import styles from '../Controller.styles'
import Icon from '../Icon'
import * as icons from '../icons/controller'
import Tooltip from '../Tooltip'
import Hover from '../Hover'

const {isMobile} = ua

const PipButtonItem = ({isPip, onClick}) => (
  <Hover className={css(styles.menuContainer)}>
    {isPipHovered => (
      <React.Fragment>
        <button className={css(styles.button)} onClick={onClick}>
          <Icon icon={isPip ? icons.exitPip : icons.pip} />
        </button>
        <div
          className={css(
            styles.pipTooltip,
            styles.menu,
            isPipHovered && styles.menuShown
          )}
        >
          {!isMobile && (
            <Tooltip content={isPip ? 'action-exit-pip' : 'action-enter-pip'} />
          )}
        </div>
      </React.Fragment>
    )}
  </Hover>
)

export default PipButtonItem
