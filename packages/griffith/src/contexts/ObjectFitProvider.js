import React from 'react'
import PropTypes from 'prop-types'
import ObjectFitContext from './ObjectFitContext'

// https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
export const VALID_FIT = ['fill', 'contain', 'cover', 'none', 'scale-down']

export default class ObjectFitProvider extends React.Component {
  static propTypes = {
    initialObjectFit: PropTypes.oneOf(VALID_FIT).isRequired,
  }

  static defaultProps = {
    initialObjectFit: 'contain',
  }

  state = {
    objectFit: this.props.initialObjectFit,
  }

  setObjectFit = objectFit => {
    if (VALID_FIT.includes(objectFit) && this.state.objectFit !== objectFit) {
      this.setState({
        objectFit,
      })
    }
  }

  componentDidUpdate(prevProps) {
    const {initialObjectFit} = this.props
    if (initialObjectFit !== prevProps.initialObjectFit) {
      this.setObjectFit(initialObjectFit)
    }
  }

  render() {
    const {objectFit} = this.state
    return (
      <ObjectFitContext.Provider
        value={{
          objectFit,
          setObjectFit: this.setObjectFit,
        }}
      >
        {this.props.children}
      </ObjectFitContext.Provider>
    )
  }
}
