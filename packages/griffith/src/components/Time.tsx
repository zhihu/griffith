import React from 'react'
import formatTime from '../utils/formatTime'

type OwnProps = {
  value?: number
}

type Props = OwnProps & typeof Time.defaultProps

class Time extends React.Component<Props> {
  static defaultProps = {
    value: 0,
  }

  render() {
    const {value} = this.props
    return <span>{formatTime(value)}</span>
  }
}

export default Time
