declare const ACTIONS: {
  PLAYER: {
    PLAY: string
    PAUSE: string
    SET_VOLUME: string
    ENTER_FULLSCREEN: string
    EXIT_FULLSCREEN: string
    ENTER_PIP: string
    EXIT_PIP: string
    TIME_UPDATE: string
    SHOW_CONTROLLER: string
  }
}

// TODO：合并这两项，与 ACTIONS 不对称
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
    QUALITY_CHANGE: string,
    CHANGE_QUALITY_START: string,
    CHANGE_QUALITY_SUCCESS:string,
    CHANGE_QUALITY_FAIL: string,
    PLAYBACK_RATE_CHANGE: string
    REQUEST_PLAY: string
    REQUEST_PAUSE: string
    PLAY_COUNT: string
    PLAY_FAILED: string
    ENTER_FULLSCREEN: string
    EXIT_FULLSCREEN: string
    ENTER_PIP: string
    EXIT_PIP: string
    SHOW_CONTROLLER: string
    HIDE_CONTROLLER: string
    HOVER_PROGRESS_DOT: string
    LEAVE_PROGRESS_DOT: string,
    ENTER_PAGE_FULLSCREEN: string,
    EXIT_PAGE_FULLSCREEN: string
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
