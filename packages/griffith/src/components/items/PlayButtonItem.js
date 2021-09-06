import React from 'react'
import {css} from 'aphrodite/no-important'
import styles from '../Controller.styles'
import Icon from '../Icon'
import * as icons from '../icons/controller'

const PlayButtonItem = ({isPlaying, onClick}) => (
  <div className={css(styles.toggle)}>
    <button className={css(styles.button)} onClick={onClick}>
      <Icon icon={isPlaying ? icons.pause : icons.play} />
    </button>
  </div>
)

export default PlayButtonItem
