declare const ACTIONS: {
  PLAYER: {
    PLAY: string
    PAUSE: string
    SET_VOLUME: string
    ENTER_FULLSCREEN: string
    EXIT_FULLSCREEN: string
  }
}

declare const EVENTS: {
  DOM: {
    PLAY: string
    PLAYING: string
    PAUSE: string
    ENDED: string
    TIMEUPDATE: string
    ERROR: string
    WAITING: string
  }

  PLAYER: {
    QUALITY_CHANGE: string
    REQUEST_PLAY: string
    REQUEST_PAUSE: string
    PLAY_COUNT: string
    PLAY_FAILED: string
    ENTER_FULLSCREEN: string
    EXIT_FULLSCREEN: string
  }
}

interface MessageHelper {
  subscribeMessage: (
    handler: (
      messageName: string,
      data: any | null,
      source: MessageEventSource
    ) => void
  ) => {unsubscribe: () => void}
  dispatchMessage: (
    targetWindow: Window,
    messageName: string,
    data?: any
  ) => void
}

declare const createMessageHelper: (
  targetId?: string,
  targetOrigin?: string
) => MessageHelper

export {EVENTS, ACTIONS, createMessageHelper}
