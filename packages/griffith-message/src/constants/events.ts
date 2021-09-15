// pair to native DOM events, see https://mdn.io/video
enum DOM {
  PLAY = 'event/dom/play',
  PLAYING = 'event/dom/playing',
  PAUSE = 'event/dom/pause',
  ENDED = 'event/dom/ended',
  TIMEUPDATE = 'event/dom/timeupdate',
  ERROR = 'event/dom/error',
  WAITING = 'event/dom/waiting',
}

// custom events
enum PLAYER {
  QUALITY_CHANGE = 'event/player/quality-change',
  CHANGE_QUALITY_START = 'event/player/quality-change-start',
  CHANGE_QUALITY_SUCCESS = 'event/player/quality-change-success',
  CHANGE_QUALITY_FAIL = 'event/player/quality-change-fail',
  PLAYBACK_RATE_CHANGE = 'event/player/rate-change',
  REQUEST_PLAY = 'event/player/request-play',
  PLAY_REJECTED = 'event/player/play-rejected',
  REQUEST_PAUSE = 'event/player/request-pause',
  PLAY_COUNT = 'event/player/play-count',
  PLAY_FAILED = 'event/player/play-failed',
  ENTER_FULLSCREEN = 'event/player/enter-fullscreen',
  EXIT_FULLSCREEN = 'event/player/exit-fullscreen',
  ENTER_PAGE_FULLSCREEN = 'event/player/enter-page-fullscreen',
  EXIT_PAGE_FULLSCREEN = 'event/player/exit-page-fullscreen',
  ENTER_PIP = 'event/player/enter-pip',
  EXIT_PIP = 'event/player/exit-pip',
  SHOW_CONTROLLER = 'event/player/show-controller',
  HIDE_CONTROLLER = 'event/player/hide-controller',
  HOVER_PROGRESS_DOT = 'event/player/hover-progress-dot',
  LEAVE_PROGRESS_DOT = 'event/player/leave-progress-dot',
  SUBSCRIPTION_READY = 'event/player/subscription-ready',
}

// TODO：临时兼容，下一版本删除，直接在定义上合并，否则造成引用上的麻烦
export const EVENTS = {
  ...DOM,
  ...PLAYER,
  /** @deprecated */ DOM,
  /** @deprecated */ PLAYER,
}

export type EVENTS = DOM | PLAYER

type DOMEventParams = {
  currentTime: number
  duration: number
  error: {code: number; message: string; name: string} | null
}

export type EventParamsMap = {
  [EVENTS.PLAY]: DOMEventParams
  [EVENTS.PLAYING]: DOMEventParams
  [EVENTS.PAUSE]: DOMEventParams
  [EVENTS.ENDED]: DOMEventParams
  [EVENTS.TIMEUPDATE]: DOMEventParams
  [EVENTS.ERROR]: DOMEventParams
  [EVENTS.WAITING]: DOMEventParams
  [EVENTS.QUALITY_CHANGE]: {quality: string; prevQuality: string}
}
