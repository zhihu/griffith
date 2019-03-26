import React from 'react'
import ReactDOM from 'react-dom'
import Player from 'griffith'

export function createPlayer(target) {
  function render(props) {
    ReactDOM.render(<Player {...props} />, target)
  }

  render()

  return {
    render(props) {
      render(props)
      return this
    },

    dispose() {
      ReactDOM.render(null, target)
      return this
    },
  }
}
