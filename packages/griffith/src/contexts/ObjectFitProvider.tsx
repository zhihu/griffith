import React from 'react'
import ObjectFitContext from './ObjectFitContext'

// https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
export const VALID_FIT = ['fill', 'contain', 'cover', 'none', 'scale-down']

type OwnProps = {
  initialObjectFit: any // TODO: PropTypes.oneOf(VALID_FIT)
}

type State = any

type Props = OwnProps & typeof ObjectFitProvider.defaultProps

export default class ObjectFitProvider extends React.Component<Props, State> {
  static defaultProps = {
    initialObjectFit: 'contain',
  }

  state = {
    objectFit: this.props.initialObjectFit,
  }

  setObjectFit = (objectFit: any) => {
    if (VALID_FIT.includes(objectFit) && this.state.objectFit !== objectFit) {
      this.setState({
        objectFit,
      })
    }
  }

  componentDidUpdate(prevProps: Props) {
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
