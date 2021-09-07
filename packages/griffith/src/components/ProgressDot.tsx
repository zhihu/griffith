import React, {useRef} from 'react'
import {css} from 'aphrodite/no-important'
import {ProgressDot as ProgressDotType} from '../types'
import formatPercent from '../utils/formatPercent'
import styles from './ProgressDot.styles'

interface SharedProps {
  total: number
  onProgressDotHover?: (opts: {
    startTime: number
    left: number
    top: number
  }) => void
  onProgressDotLeave?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

interface ProgressDotItemProps extends SharedProps {
  startTime: number
}

const ProgressDotItem: React.FC<ProgressDotItemProps> = ({
  startTime,
  total,
  onProgressDotHover,
  onProgressDotLeave,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const handleMouseEnter = () => {
    if (!ref.current) {
      return
    }
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

export interface ProgressDotsProps extends SharedProps {
  progressDots: ProgressDotType[]
}

const ProgressDots: React.FC<ProgressDotsProps> = ({
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
