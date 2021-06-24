import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {css} from 'aphrodite/no-important'

import Slider from '../Slider'

import styles, {
  slider as sliderStyles,
  hoveredSlider as hoveredSliderStyles,
  dotHoveredSlider as dotHoveredSliderStyles,
} from './styles'

class Timeline extends Component {
  static propTypes = {
    onDragStart: PropTypes.func,
    onDragEnd: PropTypes.func,
    onChange: PropTypes.func,
    onSeek: PropTypes.func,
    onProgressDotHover: PropTypes.func,
    onProgressDotLeave: PropTypes.func,
  }

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

  handleChange = value => {
    const {onSeek, onChange} = this.props
    if (onSeek && value !== this.props.value) {
      onChange(value)
    }
    if (this.state.isDragging) return
    if (onSeek) {
      onSeek(value)
    }
  }

  handleProgressDotHover = (...args) => {
    this.setState({progressDotHovered: true})
    this.props.onProgressDotHover?.(...args)
  }

  handleProgressDotLeave = (...args) => {
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
          styles={[
            sliderStyles,
            (isHovered || isFocused || isDragging) && hoveredSliderStyles,
            progressDotHovered && dotHoveredSliderStyles,
          ]}
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
