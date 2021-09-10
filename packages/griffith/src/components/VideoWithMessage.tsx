import React, {useCallback, useContext, useEffect, useMemo, useRef} from 'react'
import {EVENTS} from 'griffith-message'
import {InternalContext} from '../contexts/MessageContext'
import ObjectFitContext from '../contexts/ObjectFitContext'
import PositionContext from '../contexts/PositionContext'

type AnyFunction = (...args: any[]) => void
type VideoEvent = React.SyntheticEvent<HTMLVideoElement, Event>
type NativeVideoProps = React.HTMLProps<HTMLVideoElement>
type EventPair = [string, keyof NativeVideoProps]

const eventMap: EventPair[] = [
  [EVENTS.DOM.PLAY, 'onPlay'],
  [EVENTS.DOM.PLAYING, 'onPlaying'],
  [EVENTS.DOM.PAUSE, 'onPause'],
  [EVENTS.DOM.ENDED, 'onEnded'],
  [EVENTS.DOM.TIMEUPDATE, 'onTimeUpdate'],
  [EVENTS.DOM.ERROR, 'onError'],
  [EVENTS.DOM.WAITING, 'onWaiting'],
]

function serializeDOMException(exception?: MediaError | null) {
  if (!exception) return null
  const {code, message} = exception
  return {code, message, name: (exception as any).name}
}

function getMediaEventPayload(event: VideoEvent) {
  const {currentTime, duration, error} = event.currentTarget as HTMLVideoElement
  return {
    currentTime,
    duration,
    error: serializeDOMException(error),
  }
}

export type VideoComponentType = React.ComponentType<NativeVideoProps>

type VideoWithMessageProps = NativeVideoProps & {
  Video: VideoComponentType
}

// TODO：这个文件只是做了一层方法拦截，触发播放事件，删除这些封装，简化逻辑
const VideoWithMessage = React.forwardRef<
  HTMLVideoElement,
  VideoWithMessageProps
>((props, ref) => {
  const {updateVideoSize} = useContext(PositionContext)
  const {objectFit} = useContext(ObjectFitContext)
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {emitEvent} = useContext(InternalContext)
  const propsRef = useRef(props)
  useEffect(() => {
    propsRef.current = props
  }, [props])

  const newProps = useMemo(() => {
    const newProps: Partial<NativeVideoProps> = {}
    eventMap.forEach(([eventName, key]) => {
      newProps[key] = (event: VideoEvent, ...args: any[]) => {
        emitEvent(eventName, getMediaEventPayload(event))
        const handler = propsRef.current[key] as AnyFunction
        return handler?.(event, ...args)
      }
    })

    return newProps
  }, [emitEvent])

  const handleOnLoadedMetadata = useCallback(
    (event: VideoEvent) => {
      const videoNode = event.currentTarget
      if (videoNode) {
        const {videoWidth, videoHeight} = videoNode as HTMLVideoElement
        updateVideoSize({videoWidth, videoHeight})
      }
      propsRef.current.onLoadedMetadata?.(event)
    },
    [updateVideoSize]
  )

  const {Video, ...otherProps} = props

  return (
    <Video
      {...otherProps}
      {...newProps}
      ref={ref}
      style={{objectFit}}
      onLoadedMetadata={handleOnLoadedMetadata}
    />
  )
})

export default VideoWithMessage
