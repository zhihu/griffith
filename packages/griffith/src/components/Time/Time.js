import React from 'react'
import PropTypes from 'prop-types'
import formatTime from '../../utils/formatTime'

class Time extends React.Component {
  static propTypes = {
    value: PropTypes.number,
  }

  static defaultProps = {
    value: 0,
  }

  render() {
    const {value} = this.props
    return <span>{formatTime(value)}</span>
  }
}

export default Time
