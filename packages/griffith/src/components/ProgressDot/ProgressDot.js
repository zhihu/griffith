import React from 'react'
import {css} from 'aphrodite/no-important'
import formatPercent from '../../utils/formatPercent'
import styles from './styles'

const ProgressDotItem = ({startTime, total}) => {
  return (
    <div
      className={css(styles.item)}
      style={{
        left: formatPercent(startTime, total),
      }}
    />
  )
}
const ProgressDot = ({progressDot = [], total}) => {
  return (
    <div className={css(styles.root)}>
      {progressDot.map((i, index) => (
        <ProgressDotItem key={index} startTime={i.startTime} total={total} />
      ))}
    </div>
  )
}
export default ProgressDot
