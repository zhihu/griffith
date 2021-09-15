import React, {useCallback, useEffect, useRef, useState} from 'react'
import {EVENTS, ACTIONS, createMessageHelper} from 'griffith-message'

export default function IframePage(): JSX.Element {
  const [iframeRefs] = useState(() =>
    [...Array(4).keys()].map(() => React.createRef<HTMLIFrameElement>())
  )
  const timeInputRef = useRef<HTMLInputElement>(null)
  const helperRef = useRef<ReturnType<typeof createMessageHelper>>()

  useEffect(() => {
    helperRef.current = createMessageHelper()

    function pauseAllOtherVideos(thisWindow: MessageEventSource) {
      iframeRefs
        .map((ref) => ref.current!.contentWindow!)
        .filter((w) => w !== thisWindow)
        .forEach((w) =>
          helperRef.current!.dispatchMessage(w, ACTIONS.PLAYER.PAUSE)
        )
    }

    const disposer = helperRef.current.subscribeMessage(
      (messageName, data, sourceWindow) => {
        if (messageName === EVENTS.DOM.PLAY) {
          pauseAllOtherVideos(sourceWindow!)
        }
      }
    )

    return () => {
      disposer.unsubscribe()
    }
  }, [iframeRefs])

  const getFirstWindow = useCallback(
    () => iframeRefs[0].current!.contentWindow!,
    [iframeRefs]
  )

  return (
    <>
      <p>本页面可以测试播放器在 iframe 中的效果，还可以测试跨窗口消息接口</p>
      <div>
        {iframeRefs.map((ref, i) => (
          <iframe
            ref={ref}
            key={i}
            src="/mp4?nonav"
            allowFullScreen
            frameBorder="0"
          />
        ))}
      </div>
      <section>
        <h2>场景演示</h2>
        <button
          onClick={() => {
            helperRef.current!.dispatchMessage(
              getFirstWindow(),
              ACTIONS.PLAYER.PAUSE
            )
          }}
        >
          暂停第一个视频
        </button>
        <button
          onClick={() => {
            helperRef.current!.dispatchMessage(
              getFirstWindow(),
              ACTIONS.PLAYER.PLAY
            )
          }}
        >
          播放第一个视频（暂停其他视频）
        </button>
        <div>
          <input ref={timeInputRef} />
          <button
            onClick={() => {
              const currentTime = Number(timeInputRef.current!.value)
              helperRef.current!.dispatchMessage(
                getFirstWindow(),
                ACTIONS.PLAYER.TIME_UPDATE,
                {
                  currentTime,
                }
              )
            }}
          >
            手动 seek 第一个视频
          </button>
        </div>
        <button
          onClick={() => {
            helperRef.current!.dispatchMessage(
              getFirstWindow(),
              ACTIONS.PLAYER.SHOW_CONTROLLER
            )
          }}
        >
          让第一个视频显示进度条
        </button>
        <button
          onClick={() => {
            helperRef.current!.dispatchMessage(
              getFirstWindow(),
              ACTIONS.PLAYER.SET_VOLUME,
              {
                volume: 0,
              }
            )
          }}
        >
          让第一个视频静音
        </button>
      </section>
    </>
  )
}
