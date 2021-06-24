import React, {useRef} from 'react'
import {css} from 'aphrodite/no-important'
import formatPercent from '../../utils/formatPercent'
import styles from './styles'

const ProgressDotItem = ({
  startTime,
  total,
  onProgressDotHover,
  onProgressDotLeave,
}) => {
  const ref = useRef()
  const handleMouseEnter = () => {
    const {left, top} = ref.current.getBoundingClientRect()
    onProgressDotHover?.({startTime, left, top})
  }

  return (
    <div
      className={css(styles.item)}
      style={{
        left: formatPercent(startTime, total),
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onProgressDotLeave}
    >
      <div ref={ref} className={css(styles.innerItem)} />
    </div>
  )
}
const ProgressDots = ({
  progressDots = [],
  total,
  onProgressDotHover,
  onProgressDotLeave,
}) => {
  return (
    <div className={css(styles.root)}>
      {progressDots.map((i, index) => (
        <ProgressDotItem
          key={index}
          startTime={i.startTime}
          total={total}
          onProgressDotHover={onProgressDotHover}
          onProgressDotLeave={onProgressDotLeave}
        />
      ))}
    </div>
  )
}
export default ProgressDots
