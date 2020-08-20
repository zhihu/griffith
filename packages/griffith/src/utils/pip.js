// Refer to:
// https://w3c.github.io/picture-in-picture/
// https://css-tricks.com/an-introduction-to-the-picture-in-picture-web-api/

const pip = {
  inited: false,
  init(element, onEnter, onExit) {
    this.inited = true
    this.element = element
    this.onEnter = onEnter
    this.onExit = onExit
    this.element.addEventListener('enterpictureinpicture', this.handleEnter)
    this.element.addEventListener('leavepictureinpicture', this.handleExit)
  },
  handleEnter(e) {
    if (this.onEnter) {
      this.onEnter(e)
    }
  },
  handleExit(e) {
    if (this.onExit) {
      this.onExit(e)
    }
  },
  get supported() {
    if (!this.inited) return false
    return document.pictureInPictureEnabled
  },
  get pictureInPictureElement() {
    return document.pictureInPictureElement
  },
  request() {
    this.element.requestPictureInPicture()
  },
  exit() {
    document.exitPictureInPicture()
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
