import React from 'react'
import {css} from 'aphrodite/no-important'
import styles from '../styles'
import Timeline from '../../Timeline'

const TimelineItem = props => (
  <div className={css(styles.timeline)}>
    <Timeline {...props} />
  </div>
)

export default TimelineItem
