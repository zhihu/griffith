import React from 'react'
import {css} from 'aphrodite/no-important'
import styles from '../Controller.styles'
import Time from '../Time'

const CombinedTimeItem = ({isFullScreen, currentTime, duration}: any) => (
  <div className={css(styles.time, isFullScreen && styles.fullScreenedTime)}>
    <div className={css((styles as any).timeText)}>
      <Time value={currentTime} />
      {' / '}
      <Time value={duration} />
    </div>
  </div>
)

export default CombinedTimeItem
