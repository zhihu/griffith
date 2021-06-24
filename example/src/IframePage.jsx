import React, {useEffect} from 'react'
import {EVENTS, ACTIONS, createMessageHelper} from 'griffith-message'

export default function IframePage() {
  useEffect(() => {
    const {subscribeMessage, dispatchMessage} = createMessageHelper()

    function pauseAllOtherVideos(thisWindow) {
      Array.from(document.querySelectorAll('iframe'))
        .map(node => node.contentWindow)
        .filter(w => w !== thisWindow)
        .forEach(w => dispatchMessage(w, ACTIONS.PLAYER.PAUSE))
    }

    const disposer = subscribeMessage((messageName, data, sourceWindow) => {
      if (messageName === EVENTS.DOM.PLAY) {
        pauseAllOtherVideos(sourceWindow)
      }
    })

    const firstVideoWindow = document.querySelector('iframe').contentWindow

    document.getElementById('jsPauseFirst').addEventListener('click', () => {
      dispatchMessage(firstVideoWindow, ACTIONS.PLAYER.PAUSE)
    })

    document.getElementById('jsSeekFirst').addEventListener('click', () => {
      const currentTime = Number(document.getElementById('time').value)
      dispatchMessage(firstVideoWindow, ACTIONS.PLAYER.TIME_UPDATE, {
        currentTime,
      })
    })

    document
      .getElementById('jsShowControllerFirst')
      .addEventListener('click', () => {
        dispatchMessage(firstVideoWindow, ACTIONS.PLAYER.SHOW_CONTROLLER)
      })

    return () => {
      disposer.unsubscribe()
    }
  }, [])

  return (
    <>
      <p>本页面可以测试播放器在 iframe 中的效果，还可以测试跨窗口消息接口</p>
      <p>场景 1：向一个视频发出暂停指令</p>
      <p>场景 2：一个视频开始播放时，暂停其他视频</p>
      <p>场景 3：手动 seek</p>
      <p>场景 4：显示进度条</p>
      <div>
        <iframe src="/mp4?nonav" allowFullScreen frameBorder="0" />
        <iframe src="/mp4?nonav" allowFullScreen frameBorder="0" />
        <iframe src="/mp4?nonav" allowFullScreen frameBorder="0" />
        <iframe src="/mp4?nonav" allowFullScreen frameBorder="0" />
      </div>
      <br />
      <button id="jsPauseFirst">暂停第一个视频</button>
      <div>
        <input id="time" />
        <button id="jsSeekFirst">手动 seek 第一个视频</button>
      </div>
      <br />
      <button id="jsShowControllerFirst">让第一个视频显示进度条</button>
    </>
  )
}
