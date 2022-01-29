import React from 'react'
import * as icons from '../icons/controller'
import ControllerTooltip from './ControllerTooltip'
import ControllerButton from './ControllerButton'

const PipButtonItem: React.FC<{
  isPip: boolean
  onClick: React.HTMLAttributes<HTMLButtonElement>['onClick']
}> = ({isPip, onClick}) => (
  <ControllerTooltip localeKey={isPip ? 'action-exit-pip' : 'action-enter-pip'}>
    <ControllerButton
      icon={isPip ? icons.exitPip : icons.pip}
      onClick={onClick}
    />
  </ControllerTooltip>
)

export default PipButtonItem
