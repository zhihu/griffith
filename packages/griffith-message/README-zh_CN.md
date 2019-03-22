# griffith-message

[English](./README.md) | 简体中文

Griffith 消息通信插件

## 使用方法

```js
import {EVENTS, ACTIONS, createMessageHelper} from 'griffith-message'
```

### `createMessageHelper`

`帮助跨窗口通信`

```js
const {subscribeMessage, dispatchMessage} = createMessageHelper(
  id,
  targetOrigin,
  validateId
)
```

| Name           | Type              | Description                                                                              |
| -------------- | ----------------- | ---------------------------------------------------------------------------------------- |
| `id`           | `string | number` | 唯一标识，每条消息都会带上这个 id，接收方可以用来验证。                                  |
| `targetOrigin` | `object`          | 传出消息时的 targetOrigin 参数。另外，如果不为空，会检查传入消息的 origin 是否与之相同。 |
| `validateId`   | `boolean`         | 如果为 true 会检查传入消息的 id 是否与第一个参数的 id 相同。                             |

#### `subscribeMessage`

```js
const subscription = subscribeMessage((messageName, data, sourceWindow) => {
  // do something
})

subscription.unsubscribe()
```

| 字段           | 类型                 | 说明                            |
| -------------- | -------------------- | ------------------------------- |
| `messageName`  | `string`             | 消息名                          |
| `data`         | `object`             | 消息附加数据，没有的时候为 null |
| `sourceWindow` | `MessageEventSource` | [消息来源][messageeventsource]  |

[messageeventsource]: https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent/source 'MessageEventSource'

#### dispatchMessage

```js
dispatchMessage(targetWindow, messageName, data)
```

| 字段           | 类型     | 说明               |
| -------------- | -------- | ------------------ |
| `targetWindow` | `Window` | 目标窗口           |
| `messageName`  | `string` | 消息名             |
| `data`         | `object` | 消息附加数据，可选 |

### EVENTS

从播放器接收到的事件

| `messageName`                    | 说明                   | `data`                                   |
| -------------------------------- | ---------------------- | ---------------------------------------- |
| `EVENTS.DOM.PLAY`                | 播放                   | 见下表                                   |
| `EVENTS.DOM.PLAYING`             | 从暂停或缓冲中恢复播放 | 见下表                                   |
| `EVENTS.DOM.PAUSE`               | 暂停                   | 见下表                                   |
| `EVENTS.DOM.ENDED`               | 停止                   | 见下表                                   |
| `EVENTS.DOM.TIMEUPDATE`          | 进度更新               | 见下表                                   |
| `EVENTS.DOM.ERROR`               | 错误                   | 见下表                                   |
| `EVENTS.DOM.WAITING`             | 缓冲                   | 见下表                                   |
| `EVENTS.PLAYER.REQUEST_PLAY`     | 用户触发播放           | 无                                       |
| `EVENTS.PLAYER.QUALITY_CHANGE`   | 清晰度切换             | `{quality: string, prevQuality: string}` |
| `EVENTS.PLAYER.PLAY_COUNT`       | 播放一次               | 无                                       |
| `EVENTS.PLAYER.PLAY_FAILED`      | 播放失败               | `{currentTime: number}`                  |
| `EVENTS.PLAYER.ENTER_FULLSCREEN` | 进入全屏               | 无                                       |
| `EVENTS.PLAYER.EXIT_FULLSCREEN`  | 退出全屏               | 无                                       |

#### DOM 类 data

| 字段          | 类型                                                      | 说明                                               |
| ------------- | --------------------------------------------------------- | -------------------------------------------------- |
| `currentTime` | `number`                                                  | 当前时间                                           |
| `duration`    | `number`                                                  | 视频总时长                                         |
| `error`       | `{code: number, message: string, name: stirng}` 或 `null` | [`HTMLMediaElement.error`][htmlmediaelement-error] |

[htmlmediaelement-error]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/error 'HTMLMediaElement.error'

### ACTIONS

往播放器发送的事件

| `messageName`                     | 说明     | `data`                                            | 状态   |
| --------------------------------- | -------- | ------------------------------------------------- | ------ |
| `ACTIONS.PLAYER.PLAY`             | 播放     | `{applyOnFullScreen: boolean}` 是否应用于全屏视频 | TODO   |
| `ACTIONS.PLAYER.PAUSE`            | 暂停     | 同上                                              | 已支持 |
| `ACTIONS.PLAYER.SET_VOLUME`       | 设置音量 | `{volume: number}` 音量值，0 到 1                 | TODO   |
| `ACTIONS.PLAYER.ENTER_FULLSCREEN` | 进入全屏 | 无                                                | TODO   |
| `ACTIONS.PLAYER.EXIT_FULLSCREEN`  | 退出全屏 | 无                                                | TODO   |
