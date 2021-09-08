import React from 'react'
import {sequence} from 'griffith-utils'
import noop from 'lodash/noop'

type State = any

export default class Hover extends React.Component<{}, State> {
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
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'onMouseEnter' does not exist on type 'Re... Remove this comment to see the full error message
    const {onMouseEnter, onMouseLeave, children, ...rest} = this.props
    const {isHovered} = this.state
    return (
      <div
        {...rest}
        onMouseEnter={sequence(this.handlePointerEnter, onMouseEnter || noop)}
        onMouseLeave={sequence(this.handlePointerLeave, onMouseLeave || noop)}
      >
        {/* @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable. */}
        {children(isHovered)}
      </div>
    )
  }
}
