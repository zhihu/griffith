import React, {Component} from 'react'
import PropTypes from 'prop-types'

import Slider from '../Slider'

import {slider, minimal} from './styles'

class MinimalTimeline extends Component {
  static propTypes = {
    duration: PropTypes.number.isRequired,
    currentTime: PropTypes.number.isRequired,
    buffered: PropTypes.number.isRequired,
    show: PropTypes.bool,
    progressDots: PropTypes.arrayOf(
      PropTypes.shape({
        startTime: PropTypes.number.isRequired,
      })
    ),
  }

  static defaultProps = {
    duration: 0,
    currentTime: 0,
    buffered: 0,
    progressDots: [],
  }

  shouldComponentUpdate(nextProps) {
    return this.props.show || nextProps.show
  }

  render() {
    const {duration, currentTime, buffered, progressDots} = this.props
    return (
      <Slider
        value={currentTime}
        total={duration}
        buffered={buffered}
        progressDots={progressDots}
        styles={[slider, minimal]}
        noInteraction
      />
    )
  }
}

export default MinimalTimeline
