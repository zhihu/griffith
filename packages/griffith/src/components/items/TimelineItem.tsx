import React from 'react'
import {css} from 'aphrodite/no-important'
import styles from '../Controller.styles'
import Timeline, {TimelineProps} from '../Timeline'

const TimelineItem = (props: TimelineProps) => {
  return (
    <div className={css(styles.timeline)}>
      <Timeline {...props} />
    </div>
  )
}

export default TimelineItem
