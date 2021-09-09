import React from 'react'
import {css} from 'aphrodite/no-important'
import {reduce} from 'griffith-utils'
import listenResize from '../utils/listenResize'
import PositionContext from './PositionContext'
import styles from './PositionProvider.styles'

type Props = {
  shouldObserveResize?: boolean
}

type State = any

export default class PositionProvider extends React.PureComponent<
  Props,
  State
> {
  unlistenResize_: any

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
    this.updateHelperImageSrc()
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
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
      this.unlistenResize_ = listenResize(root, this.updateIsFullWidth)
    }
  }

  stopObservingResize() {
    if (this.unlistenResize_) {
      this.unlistenResize_()
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
    const helperImageSrc = canvas.toDataURL()
    this.setState({helperImageSrc})
  }

  updateIsFullWidth = () => {
    const {videoWidth, videoHeight} = this.state
    if (!videoWidth || !videoHeight) {
      return
    }
    const root = this.ref.current
    if (!root) return

    const {width, height} = (root as any).getBoundingClientRect()
    // 因为视频缩放后，长宽可能不严格相等，所以认为差值小于等于 0.01 的就算相等。
    // 比如 1280x720 (1.777777778) 和 848x478 (1.774058577)，认为相等。
    const isFullWidth = width / height - videoWidth / videoHeight <= 0.01
    if (isFullWidth !== this.state.isFullWidth) {
      this.setState({isFullWidth})
    }
  }

  triggerUpdateIsFullWidth = () => requestAnimationFrame(this.updateIsFullWidth)

  updateVideoSize = ({videoWidth, videoHeight}: any) => {
    this.setState({videoWidth, videoHeight})
  }

  render() {
    const {children} = this.props
    const {isFullWidth, helperImageSrc} = this.state
    return (
      <PositionContext.Provider
        value={{
          isFullWidth,
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{ isFullWidth: boolean; helperImageSrc: null... Remove this comment to see the full error message
          helperImageSrc,
          updateVideoSize: this.updateVideoSize,
        }}
      >
        {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'RefObject<unknown>' is not assignable to typ... Remove this comment to see the full error message */}
        <div className={css(styles.root)} ref={this.ref}>
          {children}
        </div>
      </PositionContext.Provider>
    )
  }
}
