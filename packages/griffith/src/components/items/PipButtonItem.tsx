import React from 'react'
import * as icons from '../icons/controller'
import ControllerButton from './ControllerButton'
import ControllerTooltip from './ControllerTooltip'

const PipButtonItem: React.FC<{
  isPip: boolean
  onClick: React.HTMLAttributes<HTMLButtonElement>['onClick']
}> = ({isPip, onClick}) => (
  <ControllerTooltip
    localeKey={isPip ? 'action-exit-pip' : 'action-enter-pip'}
    hotkey="h"
  >
    <ControllerButton
      icon={isPip ? icons.exitPip : icons.pip}
      onClick={onClick}
    />
  </ControllerTooltip>
)

export default PipButtonItem
