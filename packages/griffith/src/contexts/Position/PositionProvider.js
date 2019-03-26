import React from 'react'
import PropTypes from 'prop-types'
import {css} from 'aphrodite/no-important'
import {reduce} from 'griffith-utils'
import elementResizeEvent from 'element-resize-event'
import PositionContext from './PositionContext'
import styles from './styles'

export default class PositionProvider extends React.PureComponent {
  static propTypes = {
    shouldObserveResize: PropTypes.bool,
  }

  state = {
    videoWidth: 0,
    videoHeight: 0,
    isFullWidth: false,
    helperImageSrc: null,
  }

  ref = React.createRef()

  componentDidMount() {
    if (this.props.shouldObserveResize) {
      this.startObservingResize()
    }
    this.triggerUpdateIsFullWidth()
    this.updateHelperImageSrc()
  }

  componentDidUpdate(prevProps, prevState) {
    const {shouldObserveResize: prevShouldObserve} = prevProps
    const {videoWidth: prevWidth, videoHeight: prevHeight} = prevState
    const {shouldObserveResize} = this.props
    const {videoWidth, videoHeight} = this.state

    if (prevWidth !== videoWidth || prevHeight !== videoHeight) {
      this.triggerUpdateIsFullWidth()
      this.updateHelperImageSrc()
    }

    if (!prevShouldObserve && shouldObserveResize) {
      this.startObservingResize()
    }
    if (prevShouldObserve && !shouldObserveResize) {
      this.stopObservingResize()
    }
  }

  componentWillUnmount() {
    this.stopObservingResize()
  }

  startObservingResize = () => {
    const root = this.ref.current
    if (root) {
      elementResizeEvent(root, this.updateIsFullWidth)
    }
  }

  stopObservingResize() {
    const root = this.ref.current
    if (root) {
      elementResizeEvent.unbind(root)
    }
  }

  updateHelperImageSrc = () => {
    const {videoWidth, videoHeight} = this.state
    if (!videoWidth || !videoHeight) {
      return
    }
    const [width, height] = reduce(videoWidth, videoHeight)
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    canvas.toBlob(blob => {
      URL.revokeObjectURL(this.state.helperImageSrc)
      const helperImageSrc = URL.createObjectURL(blob)
      this.setState({helperImageSrc})
    }, 'image/jpeg')
  }

  updateIsFullWidth = () => {
    const {videoWidth, videoHeight} = this.state
    if (!videoWidth || !videoHeight) {
      return
    }
    const root = this.ref.current
    if (!root) return

    const {width, height} = root.getBoundingClientRect()
    // 因为视频缩放后，长宽可能不严格相等，所以认为差值小于等于 0.01 的就算相等。
    // 比如 1280x720 (1.777777778) 和 848x478 (1.774058577)，认为相等。
    const isFullWidth = width / height - videoWidth / videoHeight <= 0.01
    if (isFullWidth !== this.state.isFullWidth) {
      this.setState({isFullWidth})
    }
  }

  triggerUpdateIsFullWidth = () => requestAnimationFrame(this.updateIsFullWidth)

  updateVideoSize = ({videoWidth, videoHeight}) => {
    this.setState({videoWidth, videoHeight})
  }

  render() {
    const {children} = this.props
    const {isFullWidth, helperImageSrc} = this.state
    return (
      <PositionContext.Provider
        value={{
          isFullWidth,
          helperImageSrc,
          updateVideoSize: this.updateVideoSize,
        }}
      >
        <div className={css(styles.root)} ref={this.ref}>
          {children}
        </div>
      </PositionContext.Provider>
    )
  }
}
