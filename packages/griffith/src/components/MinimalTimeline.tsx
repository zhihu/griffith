import React, {Component} from 'react'
import {ProgressDot} from '../types'
import Slider from './Slider'
import {slider, minimal} from './Timeline.styles'

type OwnProps = {
  duration: number
  currentTime: number
  buffered: number
  show: boolean
  progressDots?: ProgressDot[]
}

type Props = OwnProps & typeof MinimalTimeline.defaultProps

class MinimalTimeline extends Component<Props> {
  static defaultProps = {
    show: false,
    duration: 0,
    currentTime: 0,
    buffered: 0,
    progressDots: [] as ProgressDot[],
  }

  shouldComponentUpdate(nextProps: Props) {
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
