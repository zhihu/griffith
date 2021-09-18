import React from 'react'
import * as icons from '../icons/controller'
import ControllerButton from './ControllerButton'

const PlayButtonItem: React.FC<{
  isPlaying: boolean
  onClick: React.HTMLAttributes<HTMLButtonElement>['onClick']
}> = ({isPlaying, onClick}) => (
  <div>
    <ControllerButton
      icon={isPlaying ? icons.pause : icons.play}
      onClick={onClick}
    />
  </div>
)

export default PlayButtonItem
