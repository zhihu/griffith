import React, {Component} from 'react'
import {css} from 'aphrodite/no-important'
import Slider, {SliderProps} from './Slider'
import styles, {
  slider as sliderStyles,
  hoveredSlider as hoveredSliderStyles,
  dotHoveredSlider as dotHoveredSliderStyles,
} from './Timeline.styles'

export type TimelineProps = {
  onDragStart?: (...args: any[]) => any
  onDragEnd?: (...args: any[]) => any
  onChange?: (...args: any[]) => any
  onSeek?: (...args: any[]) => any
  onProgressDotHover?: (...args: any[]) => any
  onProgressDotLeave?: (...args: any[]) => any
} & SliderProps

export type TimelineState = {
  isHovered: boolean
  isFocused: boolean
  isDragging: boolean
  progressDotHovered: boolean
}

class Timeline extends Component<TimelineProps, TimelineState> {
  state = {
    isHovered: false,
    isFocused: false,
    isDragging: false,
    progressDotHovered: false,
  }

  // refs
  root = null

  handlePointerEnter = () => {
    this.setState({isHovered: true})
  }

  handlePointerLeave = () => {
    this.setState({isHovered: false, isFocused: false})
  }

  handleFocus = () => {
    this.setState({isFocused: true})
  }

  handleBlur = () => {
    this.setState({isFocused: false})
  }

  handleDragStart = () => {
    this.setState({isDragging: true})

    const {onDragStart} = this.props
    if (onDragStart) {
      onDragStart()
    }
  }

  handleDragEnd = () => {
    this.setState({isDragging: false})

    const {onDragEnd} = this.props
    if (onDragEnd) {
      onDragEnd()
    }
  }

  handleChange = (value: any) => {
    const {onSeek, onChange} = this.props
    if (onSeek && value !== (this.props as any).value) {
      onChange?.(value)
    }
    if (this.state.isDragging) return
    if (onSeek) {
      onSeek(value)
    }
  }

  handleProgressDotHover = (...args: any[]) => {
    this.setState({progressDotHovered: true})
    this.props.onProgressDotHover?.(...args)
  }

  handleProgressDotLeave = (...args: any[]) => {
    this.setState({progressDotHovered: false})
    this.props.onProgressDotLeave?.(...args)
  }

  render() {
    const {isHovered, isFocused, isDragging, progressDotHovered} = this.state
    return (
      <div
        className={css(styles.root)}
        onMouseEnter={this.handlePointerEnter}
        onMouseLeave={this.handlePointerLeave}
      >
        <Slider
          {...this.props}
          styles={
            [
              sliderStyles,
              (isHovered || isFocused || isDragging) && hoveredSliderStyles,
              progressDotHovered && dotHoveredSliderStyles,
            ].filter(Boolean) as Record<string, unknown>[]
          }
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onDragStart={this.handleDragStart}
          onDragEnd={this.handleDragEnd}
          onChange={this.handleChange}
          onProgressDotHover={this.handleProgressDotHover}
          onProgressDotLeave={this.handleProgressDotLeave}
        />
      </div>
    )
  }
}

export default Timeline
