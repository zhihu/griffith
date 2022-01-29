import React from 'react'
import * as icons from '../icons/controller'
import ControllerTooltip from './ControllerTooltip'
import ControllerButton from './ControllerButton'

const PageFullScreenButtonItem: React.FC<{
  isFullScreen: boolean
  onClick: React.HTMLAttributes<HTMLButtonElement>['onClick'] | (() => void)
}> = ({isFullScreen, onClick}) => (
  <ControllerTooltip
    content={
      isFullScreen
        ? 'action-exit-page-fullscreen'
        : 'action-enter-page-fullscreen'
    }
  >
    <ControllerButton
      icon={isFullScreen ? icons.exitPageScreen : icons.enterPageScreen}
      onClick={onClick}
    />
  </ControllerTooltip>
)

export default PageFullScreenButtonItem
