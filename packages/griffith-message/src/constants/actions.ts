// NOTE: 补充新类型时，应当在 `ActionParamsMap` 中定义参数类型
enum PLAYER {
  PLAY = 'action/player/play',
  PAUSE = 'action/player/pause',
  SET_VOLUME = 'action/player/set-volume',
  ENTER_FULLSCREEN = 'action/player/enter-fullscreen',
  EXIT_FULLSCREEN = 'action/player/exit-fullscreen',
  ENTER_PAGE_FULLSCREEN = 'event/player/enter-page-fullscreen',
  EXIT_PAGE_FULLSCREEN = 'event/player/exit-page-fullscreen',
  ENTER_PIP = 'action/player/enter-pip',
  EXIT_PIP = 'action/player/exit-pip',
  TIME_UPDATE = 'action/player/time-update',
  SHOW_CONTROLLER = 'action/player/show-controller',
}

// TODO：临时兼容，下一版本删除，直接在定义上合并，否则造成引用上的麻烦
export const ACTIONS = {
  ...PLAYER,
  /** @deprecated */
  PLAYER,
}

export type ACTIONS = PLAYER | never

// 泛型确保了 void 定义有效应用于 spread 提取
type Dispatch<P> = (params: P) => void

export type ActionParamsMap = {
  [ACTIONS.PLAY]: Dispatch<void>
  [ACTIONS.PAUSE]: Dispatch<void | {dontApplyOnFullScreen: boolean}>
  [ACTIONS.SET_VOLUME]: Dispatch<{volume: number}>
  [ACTIONS.ENTER_FULLSCREEN]: Dispatch<void>
  [ACTIONS.EXIT_FULLSCREEN]: Dispatch<void>
  [ACTIONS.ENTER_PAGE_FULLSCREEN]: Dispatch<void>
  [ACTIONS.EXIT_PAGE_FULLSCREEN]: Dispatch<void>
  [ACTIONS.ENTER_PIP]: Dispatch<void>
  [ACTIONS.EXIT_PIP]: Dispatch<void>
  [ACTIONS.TIME_UPDATE]: Dispatch<{currentTime: number}>
  [ACTIONS.SHOW_CONTROLLER]: Dispatch<void>
}
