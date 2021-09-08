// Refer to:
// https://w3c.github.io/picture-in-picture/
// https://css-tricks.com/an-introduction-to-the-picture-in-picture-web-api/

const pip = {
  inited: false,
  init(element: any, onEnter: any, onExit: any) {
    this.inited = true
    ;(this as any).element = element
    ;(this as any).onEnter = onEnter
    // @ts-expect-error ts-migrate(2551) FIXME: Property 'onExit' does not exist on type '{ inited... Remove this comment to see the full error message
    this.onExit = onExit
    ;(this as any).element.addEventListener(
      'enterpictureinpicture',
      this.handleEnter
    )
    ;(this as any).element.addEventListener(
      'leavepictureinpicture',
      this.handleExit
    )
  },
  handleEnter(e: any) {
    if ((this as any).onEnter) {
      ;(this as any).onEnter(e)
    }
  },
  handleExit(e: any) {
    // @ts-expect-error ts-migrate(2551) FIXME: Property 'onExit' does not exist on type '{ inited... Remove this comment to see the full error message
    if (this.onExit) {
      // @ts-expect-error ts-migrate(2551) FIXME: Property 'onExit' does not exist on type '{ inited... Remove this comment to see the full error message
      this.onExit(e)
    }
  },
  get supported() {
    if (!this.inited) return false
    return (document as any).pictureInPictureEnabled
  },
  get pictureInPictureElement() {
    return (document as any).pictureInPictureElement
  },
  request() {
    ;(this as any).element.requestPictureInPicture()
  },
  exit() {
    ;(document as any).exitPictureInPicture()
  },
  toggle() {
    if (this.pictureInPictureElement) {
      this.exit()
    } else {
      this.request()
    }
  },
}

export default pip
