import React from 'react'
import {css} from 'aphrodite/no-important'
import VolumeSlider from '../VolumeSlider'
import Icon from '../Icon'
import * as icons from '../icons/controller'
import styles from '../Controller.styles'

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
    <button className={css(styles.button)} onClick={onToggleMuted}>
      <Icon icon={volume === 0 ? icons.muted : icons.volume} />
    </button>
    <div className={css(styles.menu, menuShown && styles.menuShown)}>
      <VolumeSlider
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
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
