import React from 'react'
import {css} from 'aphrodite/no-important'
import {ua} from 'griffith-utils'
import styles from '../Controller.styles'
import * as icons from '../icons/controller'
import Tooltip from '../Tooltip'
import Hover from '../Hover'
import ControllerButton from './ControllerButton'

const {isMobile} = ua

const PipButtonItem: React.FC<{
  isPip: boolean
  onClick: React.HTMLAttributes<HTMLButtonElement>['onClick']
}> = ({isPip, onClick}) => (
  <Hover className={css(styles.menuContainer)}>
    {(isPipHovered) => (
      <>
        <ControllerButton
          icon={isPip ? icons.exitPip : icons.pip}
          onClick={onClick}
        />
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
      </>
    )}
  </Hover>
)

export default PipButtonItem
