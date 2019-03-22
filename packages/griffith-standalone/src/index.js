import React from 'react'
import ReactDOM from 'react-dom'
import Player from 'griffith'

export function createPlayer(target) {
  return {
    render(props) {
      ReactDOM.render(<Player {...props} />, target)
    },

    dispose() {
      ReactDOM.unmountComponentAtNode(target)
    },
  }
}
