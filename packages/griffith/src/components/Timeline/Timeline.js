import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {css} from 'aphrodite/no-important'

import Slider from '../Slider'

import styles, {
  slider as sliderStyles,
  hoveredSlider as hoveredSliderStyles,
} from './styles'

class Timeline extends Component {
  static propTypes = {
    onDragStart: PropTypes.func,
    onDragEnd: PropTypes.func,
    onChange: PropTypes.func,
    onSeek: PropTypes.func,
  }

  state = {
    isHovered: false,
    isFocused: false,
    isDragging: false,
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

  render() {
    const {isHovered, isFocused, isDragging} = this.state
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
          ]}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onDragStart={this.handleDragStart}
          onDragEnd={this.handleDragEnd}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

export default Timeline
