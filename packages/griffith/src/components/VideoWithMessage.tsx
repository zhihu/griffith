import React from 'react'
import {EVENTS} from 'griffith-message'
import {sequence} from 'griffith-utils'
import noop from 'lodash/noop'
import {InternalContext} from '../contexts/MessageContext'
import ObjectFitContext from '../contexts/ObjectFitContext'
import PositionContext from '../contexts/PositionContext'

const eventMap = [
  [EVENTS.DOM.PLAY, 'onPlay'],
  [EVENTS.DOM.PLAYING, 'onPlaying'],
  [EVENTS.DOM.PAUSE, 'onPause'],
  [EVENTS.DOM.ENDED, 'onEnded'],
  [EVENTS.DOM.TIMEUPDATE, 'onTimeUpdate'],
  [EVENTS.DOM.ERROR, 'onError'],
  [EVENTS.DOM.WAITING, 'onWaiting'],
]

function serializeDOMException(exception: any) {
  if (!exception) return null
  const {code, messge, name} = exception
  return {code, messge, name}
}

function getMediaEventPayload(event: any) {
  const {currentTime, duration, error} = event.currentTarget
  return {
    currentTime,
    duration,
    error: serializeDOMException(error),
  }
}

// TODO：这个文件只是做了一层方法拦截，触发播放事件，删除这些封装，简化逻辑
const VideoWithMessage = React.forwardRef((props, ref) => {
  const renderChildren = (
    emitEvent: any,
    objectFit: any,
    updateVideoSize: any
  ) => {
    const newProps = {}
    eventMap.map(([eventName, key]) => {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      const handler = props[key]
      const emit = (event: any) =>
        emitEvent(eventName, getMediaEventPayload(event))
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      newProps[key] = sequence(emit, handler || noop)
    })

    const updateVideoSizeOnLoadedMetadata = (event: any) => {
      const videoNode = event.currentTarget
      if (videoNode) {
        const {videoWidth, videoHeight} = videoNode
        updateVideoSize({videoWidth, videoHeight})
      }
    }

    const newOnLoadedMetadata = sequence(
      updateVideoSizeOnLoadedMetadata,
      (props as any).onLoadedMetadata || noop
    )

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'Video' does not exist on type '{ childre... Remove this comment to see the full error message
    const {Video, ...otherProps} = props

    return (
      <Video
        {...otherProps}
        {...newProps}
        ref={ref}
        style={{objectFit}}
        onLoadedMetadata={newOnLoadedMetadata}
      />
    )
  }

  return (
    <PositionContext.Consumer>
      {({updateVideoSize}) => (
        <ObjectFitContext.Consumer>
          {({objectFit}) => (
            <InternalContext.Consumer>
              {({emitEvent}) =>
                renderChildren(emitEvent, objectFit, updateVideoSize)
              }
            </InternalContext.Consumer>
          )}
        </ObjectFitContext.Consumer>
      )}
    </PositionContext.Consumer>
  )
})

export default VideoWithMessage
