import React, {useCallback} from 'react'
import {css} from 'aphrodite/no-important'
import Slider, {SliderProps} from './Slider'
import styles, {
  slider as sliderStyles,
  hoveredSlider as hoveredSliderStyles,
  dotHoveredSlider as dotHoveredSliderStyles,
} from './Timeline.styles'
import useBoolean from '../hooks/useBoolean'
import useHandler from '../hooks/useHandler'
import noop from 'lodash/noop'

export type TimelineProps = {
  onSeek?: (value: number) => void
} & Omit<SliderProps, 'styles'>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useConstCallbacks = (...fns: ((...args: any[]) => void)[]) =>
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useCallback((...args) => fns.forEach((f) => f(...args)), [])

const Timeline: React.FC<TimelineProps> = ({
  value,
  onDragStart,
  onDragEnd,
  onSeek,
  onChange,
  onProgressDotHover,
  onProgressDotLeave,
  ...props
}) => {
  const [isFocused, isFocusedSwitch] = useBoolean()
  const [isHovered, isHoveredSwitch] = useBoolean()
  const [isDragging, isDraggingSwitch] = useBoolean()
  const [progressDotHovered, progressDotHoveredSwitch] = useBoolean()

  const handleChange = useHandler((newValue: number) => {
    if (newValue !== value) {
      onChange?.(newValue)
    }
    if (!isDragging) {
      onSeek?.(newValue)
    }
  })

  return (
    <div
      className={css(styles.root)}
      onMouseEnter={isHoveredSwitch.on}
      onMouseLeave={useConstCallbacks(isHoveredSwitch.off, isFocusedSwitch.off)}
    >
      <Slider
        {...props}
        styles={
          [
            sliderStyles,
            (isHovered || isFocused || isDragging) && hoveredSliderStyles,
            progressDotHovered && dotHoveredSliderStyles,
          ].filter(Boolean) as Record<string, unknown>[]
        }
        value={value}
        onChange={handleChange}
        onFocus={isFocusedSwitch.on}
        onBlur={isFocusedSwitch.off}
        onDragStart={useConstCallbacks(
          isDraggingSwitch.on,
          useHandler(onDragStart || noop)
        )}
        onDragEnd={useConstCallbacks(
          isDraggingSwitch.off,
          useHandler(onDragEnd || noop)
        )}
        onProgressDotHover={useConstCallbacks(
          progressDotHoveredSwitch.on,
          useHandler(onProgressDotHover || noop)
        )}
        onProgressDotLeave={useConstCallbacks(
          progressDotHoveredSwitch.off,
          useHandler(onProgressDotLeave || noop)
        )}
      />
    </div>
  )
}

export default Timeline
