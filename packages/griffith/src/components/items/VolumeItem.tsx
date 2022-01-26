import React from 'react'
import {css} from 'aphrodite/no-important'
import VolumeSlider, {VolumeSliderProps} from '../VolumeSlider'
import * as icons from '../icons/controller'
import styles from '../Controller.styles'
import ControllerButton from './ControllerButton'

type VolumeItemProps = Pick<
  React.HTMLProps<HTMLDivElement>,
  'onMouseEnter' | 'onMouseLeave'
> &
  Pick<VolumeSliderProps, 'onChange' | 'onDragStart' | 'onDragEnd'> & {
    volume: number
    menuShown?: boolean
    onToggleMuted?(): void
  }

const VolumeItem = ({
  volume,
  menuShown,
  onMouseEnter,
  onMouseLeave,
  onDragStart,
  onDragEnd,
  onChange,
  onToggleMuted,
}: VolumeItemProps) => (
  <div
    className={css(styles.menuContainer)}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <ControllerButton
      icon={volume === 0 ? icons.muted : icons.volume}
      onClick={() => onToggleMuted?.()}
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
