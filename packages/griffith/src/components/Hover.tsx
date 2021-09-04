import React from 'react'
import {sequence} from 'griffith-utils'
import noop from 'lodash/noop'

export default class Hover extends React.Component {
  state = {
    isHovered: false,
  }

  handlePointerEnter = () => {
    this.setState({isHovered: true})
  }

  handlePointerLeave = () => {
    this.setState({isHovered: false})
  }

  render() {
    const {onMouseEnter, onMouseLeave, children, ...rest} = this.props
    const {isHovered} = this.state
    return (
      <div
        {...rest}
        onMouseEnter={sequence(this.handlePointerEnter, onMouseEnter || noop)}
        onMouseLeave={sequence(this.handlePointerLeave, onMouseLeave || noop)}
      >
        {children(isHovered)}
      </div>
    )
  }
}
