declare module 'isomorphic-bigscreen' {
  class BigScreen {
    element: HTMLElement
    enabled: boolean
    toggle(element: HTMLElement, onEnter: () => void, onExit: () => void): void
  }
  export = new BigScreen()
}
