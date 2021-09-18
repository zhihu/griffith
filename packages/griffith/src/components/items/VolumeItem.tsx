import React from 'react'
import {css} from 'aphrodite/no-important'
import VolumeSlider from '../VolumeSlider'
import * as icons from '../icons/controller'
import styles from '../Controller.styles'
import ControllerButton from './ControllerButton'

const VolumeItem = ({
  volume,
  menuShown,
  onMouseEnter,
  onMouseLeave,
  onDragStart,
  onDragEnd,
  onChange,
  onToggleMuted,
}: any) => (
  <div
    className={css(styles.menuContainer)}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <ControllerButton
      icon={volume === 0 ? icons.muted : icons.volume}
      onClick={onToggleMuted}
    />
    <div className={css(styles.menu, menuShown && styles.menuShown)}>
      <VolumeSlider
        value={volume}
        total={1}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onChange={onChange}
      />
    </div>
  </div>
)

export default VolumeItem
