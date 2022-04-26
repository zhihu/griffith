import React from 'react'
import * as icons from '../icons/controller'
import ControllerButton from './ControllerButton'
import ControllerTooltip from './ControllerTooltip'

const FullScreenButtonItem: React.FC<{
  isFullScreen: boolean
  onClick: React.HTMLAttributes<HTMLButtonElement>['onClick']
}> = ({isFullScreen, onClick}) => (
  <ControllerTooltip
    localeKey={
      isFullScreen ? 'action-exit-fullscreen' : 'action-enter-fullscreen'
    }
    hotkey="f"
  >
    <ControllerButton
      icon={isFullScreen ? icons.smallscreen : icons.fullscreen}
      onClick={onClick}
    />
  </ControllerTooltip>
)

export default FullScreenButtonItem
