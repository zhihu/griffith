import React from 'react'
import {EVENTS} from 'griffith-message'
import {sequence} from 'griffith-utils'
import noop from 'lodash/noop'
import {InternalContext} from '../../contexts/Message'
import {ObjectFitContext} from '../../contexts/ObjectFit'
import {PositionContext} from '../../contexts/Position'

const eventMap = [
  [EVENTS.DOM.PLAY, 'onPlay'],
  [EVENTS.DOM.PLAYING, 'onPlaying'],
  [EVENTS.DOM.PAUSE, 'onPause'],
  [EVENTS.DOM.ENDED, 'onEnded'],
  [EVENTS.DOM.TIMEUPDATE, 'onTimeUpdate'],
  [EVENTS.DOM.ERROR, 'onError'],
  [EVENTS.DOM.WAITING, 'onWaiting'],
]

function serializeDOMException(exception) {
  if (!exception) return null
  const {code, messge, name} = exception
  return {code, messge, name}
}

function getMediaEventPayload(event) {
  const {currentTime, duration, error} = event.currentTarget
  return {
    currentTime,
    duration,
    error: serializeDOMException(error),
  }
}

// TODO：这个文件只是做了一层方法拦截，触发播放事件，删除这些封装，简化逻辑
const VideoWithMessage = React.forwardRef((props, ref) => {
  const renderChildren = (emitEvent, objectFit, updateVideoSize) => {
    const newProps = {}
    eventMap.map(([eventName, key]) => {
      const handler = props[key]
      const emit = event => emitEvent(eventName, getMediaEventPayload(event))
      newProps[key] = sequence(emit, handler || noop)
    })

    const updateVideoSizeOnLoadedMetadata = event => {
      const videoNode = event.currentTarget
      if (videoNode) {
        const {videoWidth, videoHeight} = videoNode
        updateVideoSize({videoWidth, videoHeight})
      }
    }

    const newOnLoadedMetadata = sequence(
      updateVideoSizeOnLoadedMetadata,
      props.onLoadedMetadata || noop
    )

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
