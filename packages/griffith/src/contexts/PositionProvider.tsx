import React, {useRef, useEffect, useState, useMemo} from 'react'
import {css} from 'aphrodite/no-important'
import useHandler from '../hooks/useHandler'
import usePrevious from '../hooks/usePrevious'
import listenResize from '../utils/listenResize'
import PositionContext from './PositionContext'
import styles from './PositionProvider.styles'

type Props = {
  shouldObserveResize?: boolean
}

type VideoSize = {
  videoWidth: number
  videoHeight: number
}

// Create a placeholder image to preserve the original aspect ratio
const createHolderImageSrc = (width: number, height: number) =>
  `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'></svg>`

const PositionProvider: React.FC<Props> = ({children}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [helperImageSrc, setHelperImageSrc] = useState<string | null>(null)
  const [isFullWidth, setIsFullWidth] = useState<boolean>(false)
  const [videoSize, setVideoSize] = useState<VideoSize>({
    videoWidth: 0,
    videoHeight: 0,
  })

  const updateHelperImageSrc = useHandler(() => {
    const {videoWidth, videoHeight} = videoSize
    if (!videoWidth || !videoHeight) {
      return
    }
    setHelperImageSrc(createHolderImageSrc(videoWidth, videoHeight))
  })

  const updateIsFullWidth = useHandler(() => {
    const {videoWidth, videoHeight} = videoSize
    if (!videoWidth || !videoHeight) {
      return
    }
    if (!ref.current) {
      return
    }

    const {width, height} = ref.current.getBoundingClientRect()
    // 因为视频缩放后，长宽可能不严格相等，所以认为差值小于等于 0.01 的就算相等。
    // 比如 1280x720 (1.777777778) 和 848x478 (1.774058577)，认为相等。
    const isFullWidthNew = width / height - videoWidth / videoHeight <= 0.01
    if (isFullWidthNew !== isFullWidth) {
      setIsFullWidth(isFullWidthNew)
    }
  })

  useEffect(() => {
    if (ref.current) {
      return listenResize(ref.current, updateIsFullWidth)
    }
  }, [ref, updateIsFullWidth])

  useEffect(() => {
    updateHelperImageSrc()
  }, [updateHelperImageSrc])

  const prevVideoSize = usePrevious(videoSize)
  useEffect(() => {
    if (!prevVideoSize) {
      return
    }
    const {videoWidth: prevWidth, videoHeight: prevHeight} = prevVideoSize
    const {videoWidth, videoHeight} = videoSize
    if (prevWidth !== videoWidth || prevHeight !== videoHeight) {
      requestAnimationFrame(updateIsFullWidth)
      updateHelperImageSrc()
    }
  }, [prevVideoSize, updateHelperImageSrc, updateIsFullWidth, videoSize])

  const contextValue = useMemo(
    () => ({isFullWidth, helperImageSrc, updateVideoSize: setVideoSize}),
    [helperImageSrc, isFullWidth]
  )

  return (
    <PositionContext.Provider value={contextValue}>
      <div className={css(styles.root)} ref={ref}>
        {children}
      </div>
    </PositionContext.Provider>
  )
}

export default PositionProvider
