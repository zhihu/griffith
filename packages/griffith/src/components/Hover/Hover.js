import React from 'react'
import {mergeFunctions} from 'griffith-utils'

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
        onMouseEnter={mergeFunctions(this.handlePointerEnter, onMouseEnter)}
        onMouseLeave={mergeFunctions(this.handlePointerLeave, onMouseLeave)}
      >
        {children(isHovered)}
      </div>
    )
  }
}
