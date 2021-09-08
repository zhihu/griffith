import React from 'react'
import {css} from 'aphrodite/no-important'
import styles from '../Controller.styles'
import Timeline from '../Timeline'

const TimelineItem = (props: any) => {
  return (
    <div className={css(styles.timeline)}>
      <Timeline {...props} />
    </div>
  )
}

export default TimelineItem
