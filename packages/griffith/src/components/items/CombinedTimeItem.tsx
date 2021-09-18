import React from 'react'
import {css} from 'aphrodite/no-important'
import formatDuration from '../../utils/formatDuration'
import styles from '../Controller.styles'

const CombinedTimeItem: React.FC<{
  isFullScreen: boolean
  currentTime: number
  duration: number
}> = ({isFullScreen, currentTime, duration}) => (
  <div className={css(styles.time, isFullScreen && styles.fullScreenedTime)}>
    {`${formatDuration(currentTime)} / ${formatDuration(duration)}`}
  </div>
)

export default CombinedTimeItem
