import React, {Component} from 'react'

import Slider from './Slider'

import {slider, minimal} from './Timeline.styles'

type OwnProps = {
  duration: number
  currentTime: number
  buffered: number
  show?: boolean
  progressDots?: {
    startTime: number
  }[]
}

type Props = OwnProps & typeof MinimalTimeline.defaultProps

class MinimalTimeline extends Component<Props> {
  static defaultProps = {
    duration: 0,
    currentTime: 0,
    buffered: 0,
    progressDots: [],
  }

  // @ts-expect-error ts-migrate(2416) FIXME: Property 'shouldComponentUpdate' in type 'MinimalT... Remove this comment to see the full error message
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
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        styles={[slider, minimal]}
        noInteraction
      />
    )
  }
}

export default MinimalTimeline
