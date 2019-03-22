import {EVENTS, ACTIONS, createMessageHelper} from 'griffith-message'

const {subscribeMessage, dispatchMessage} = createMessageHelper()

function pauseAllOtherVideos(thisWindow) {
  Array.from(document.querySelectorAll('iframe'))
    .map(node => node.contentWindow)
    .filter(w => w !== thisWindow)
    .forEach(w => dispatchMessage(w, ACTIONS.PLAYER.PAUSE))
}

subscribeMessage((messageName, data, sourceWindow) => {
  if (messageName === EVENTS.DOM.PLAY) {
    pauseAllOtherVideos(sourceWindow)
  }
})

const firstVideoWindow = document.getElementById('video-1').contentWindow

document.getElementById('button').addEventListener('click', () => {
  dispatchMessage(firstVideoWindow, ACTIONS.PLAYER.PAUSE)
})
