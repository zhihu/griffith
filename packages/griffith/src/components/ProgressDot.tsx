import React, {useRef} from 'react'
import {css} from 'aphrodite/no-important'
import formatPercent from '../utils/formatPercent'
import styles from './ProgressDot.styles'

const ProgressDotItem = ({
  startTime,
  total,
  onProgressDotHover,
  onProgressDotLeave,
}: any) => {
  const ref = useRef()
  const handleMouseEnter = () => {
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
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
      {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'MutableRefObject<undefined>' is not assignab... Remove this comment to see the full error message */}
      <div ref={ref} className={css(styles.innerItem)} />
    </div>
  )
}
const ProgressDots = ({
  progressDots = [],
  total,
  onProgressDotHover,
  onProgressDotLeave,
}: any) => {
  return (
    <div className={css(styles.root)}>
      {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'i' implicitly has an 'any' type. */}
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
