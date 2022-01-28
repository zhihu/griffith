import React, {useCallback, useContext, useEffect, useMemo, useRef} from 'react'
import {EVENTS} from 'griffith-message'
import {InternalMessageContext} from '../contexts/MessageContext'
import ObjectFitContext from '../contexts/ObjectFitContext'
import PositionContext from '../contexts/PositionContext'

type AnyFunction = (...args: any[]) => void
type VideoEvent = React.SyntheticEvent<HTMLVideoElement, Event>
type NativeVideoProps = React.HTMLProps<HTMLVideoElement>
type EventPair = [EVENTS, keyof NativeVideoProps]

const eventMap: EventPair[] = [
  [EVENTS.PLAY, 'onPlay'],
  [EVENTS.PLAYING, 'onPlaying'],
  [EVENTS.PAUSE, 'onPause'],
  [EVENTS.ENDED, 'onEnded'],
  [EVENTS.TIMEUPDATE, 'onTimeUpdate'],
  [EVENTS.ERROR, 'onError'],
  [EVENTS.WAITING, 'onWaiting'],
  [EVENTS.CANPLAY, 'onCanPlay'],
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
  onNativeEvent?: (event: VideoEvent) => void
  Video: VideoComponentType
}

// TODO：这个文件只是做了一层方法拦截，触发播放事件，删除这些封装，简化逻辑
const VideoWithMessage = React.forwardRef<
  HTMLVideoElement,
  VideoWithMessageProps
>((props, ref) => {
  const {updateVideoSize} = useContext(PositionContext)
  const {objectFit} = useContext(ObjectFitContext)
  const {emitEvent} = useContext(InternalMessageContext)
  const propsRef = useRef(props)
  useEffect(() => {
    propsRef.current = props
  }, [props])

  const newProps = useMemo(() => {
    const newProps: Partial<VideoWithMessageProps> = {}
    eventMap.forEach(([eventName, key]) => {
      newProps[key] = (event: VideoEvent, ...args: any[]) => {
        emitEvent(eventName, getMediaEventPayload(event))
        const handler = propsRef.current[key] as AnyFunction
        propsRef.current.onNativeEvent?.(event)
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

  const {
    Video,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onNativeEvent,
    ...otherProps
  } = props

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
