// pair to native DOM events, see https://mdn.io/video
// NOTE: 补充新类型时，应当在 `EventParamsMap` 中定义参数类型
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
// NOTE: 补充新类型时，应当在 `EventParamsMap` 中定义参数类型
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
  /** @deprecated Please use `EVENTS.NAME` instead */ DOM,
  /** @deprecated Please use `EVENTS.NAME` instead */ PLAYER,
}

export type EVENTS = DOM | PLAYER

type DOMEventParams = {
  currentTime: number
  duration: number
  error: {code: number; message: string; name: string} | null
}

type PlaybackRate = {
  value: number
  text: string
}

type Quality = 'auto' | 'ld' | 'sd' | 'hd' | 'fhd'

// 泛型确保了 void 可选参数定义有效（应用于 spread 提取）
type Listen<T> = (params: T) => void

export type EventParamsMap = {
  [EVENTS.PLAY]: Listen<DOMEventParams>
  [EVENTS.PLAYING]: Listen<DOMEventParams>
  [EVENTS.PAUSE]: Listen<DOMEventParams>
  [EVENTS.ENDED]: Listen<DOMEventParams>
  [EVENTS.TIMEUPDATE]: Listen<DOMEventParams>
  [EVENTS.ERROR]: Listen<DOMEventParams>
  [EVENTS.WAITING]: Listen<DOMEventParams>
  [EVENTS.QUALITY_CHANGE]: Listen<{quality: Quality; prevQuality: Quality}>
  [EVENTS.CHANGE_QUALITY_START]: Listen<void>
  [EVENTS.CHANGE_QUALITY_SUCCESS]: Listen<void>
  [EVENTS.CHANGE_QUALITY_FAIL]: Listen<Quality>
  [EVENTS.PLAYBACK_RATE_CHANGE]: Listen<{
    prevRate: PlaybackRate
    rate: PlaybackRate
  }>
  [EVENTS.REQUEST_PLAY]: Listen<void>
  [EVENTS.PLAY_REJECTED]: Listen<void>
  [EVENTS.REQUEST_PAUSE]: Listen<void>
  [EVENTS.PLAY_COUNT]: Listen<void>
  [EVENTS.PLAY_FAILED]: Listen<{currentTime: number}>
  [EVENTS.ENTER_FULLSCREEN]: Listen<void>
  [EVENTS.EXIT_FULLSCREEN]: Listen<void>
  [EVENTS.ENTER_PAGE_FULLSCREEN]: Listen<void>
  [EVENTS.EXIT_PAGE_FULLSCREEN]: Listen<void>
  [EVENTS.ENTER_PIP]: Listen<void>
  [EVENTS.EXIT_PIP]: Listen<void>
  [EVENTS.SHOW_CONTROLLER]: Listen<void>
  [EVENTS.HIDE_CONTROLLER]: Listen<void>
  [EVENTS.HOVER_PROGRESS_DOT]: Listen<{
    startTime: number
    left: number
    top: number
  }>
  [EVENTS.LEAVE_PROGRESS_DOT]: Listen<void>
  [EVENTS.SUBSCRIPTION_READY]: Listen<void>
}
