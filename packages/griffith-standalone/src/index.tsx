import React from 'react'
import ReactDOM from 'react-dom'
import Player, {PlayerProps} from 'griffith'

export function createPlayer(target: Element) {
  return {
    render(props: PlayerProps) {
      ReactDOM.render(<Player {...props} />, target)
    },

    dispose() {
      ReactDOM.unmountComponentAtNode(target)
    },
  }
}
