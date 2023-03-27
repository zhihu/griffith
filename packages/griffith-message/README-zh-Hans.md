# griffith-message

[English](./README.md) | 简体中文

Griffith 消息通信插件

## 使用方法

```js
import {EVENTS, ACTIONS, createMessageHelper} from 'griffith-message'

const helper = createMessageHelper()
// register event listener
helper.subscribeMessage(EVENTS.PLAY, (r) => {
  r.currentTime
})
helper.subscribeMessage(EVENTS.QUALITY_CHANGE, (r) => {
  r.quality
})
// dispatch action to player
helper.dispatchMessage(window, ACTIONS.SET_VOLUME, {volume: 0.5})
// dispose all event listeners
helper.dispose()
```

### `createMessageHelper`

帮助跨窗口通信。

```ts
createMessageHelper(id?, targetOrigin?, shouldValidateId?)
```

| Name           | Type               | Description                                                                              |
| -------------- | ------------------ | ---------------------------------------------------------------------------------------- |
| `id`           | `string \| number` | 唯一标识，每条消息都会带上这个 id，接收方可以用来验证。                                  |
| `targetOrigin` | `object`           | 传出消息时的 targetOrigin 参数。另外，如果不为空，会检查传入消息的 origin 是否与之相同。 |
| `validateId`   | `boolean`          | 如果为 true 会检查传入消息的 id 是否与第一个参数的 id 相同。                             |

#### `subscribeMessage`

```ts
subscribeMessage(name: EVENTS, (data?: object, source?: MessageEventSource) => void): () => void
```

| 字段           | 类型                 | 说明                              |
| -------------- | -------------------- | --------------------------------- |
| `name`         | `EVENTS`             | 消息名                            |
| `data`         | `object`             | 消息附加数据，没有的时候为 `void` |
| `sourceWindow` | `MessageEventSource` | [消息来源][messageeventsource]    |

[messageeventsource]: https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent/source 'MessageEventSource'

#### dispatchMessage

```ts
dispatchMessage(target: Window, name: ACTIONS, data?: object): void
```

| 字段     | 类型      | 说明               |
| -------- | --------- | ------------------ |
| `target` | `Window`  | 目标窗口           |
| `name`   | `ACTIONS` | 消息名             |
| `data`   | `object`  | 消息附加数据，可选 |

### EVENTS

从播放器接收到的事件

| `messageName`               | 说明                               | `data`                                           |
| --------------------------- | ---------------------------------- | ------------------------------------------------ |
| `EVENTS.CANPLAY`            | 可播放                             | 见下表                                           |
| `EVENTS.PLAY`               | 播放                               | 见下表                                           |
| `EVENTS.PLAYING`            | 从暂停或缓冲中恢复播放             | 见下表                                           |
| `EVENTS.PAUSE`              | 暂停                               | 见下表                                           |
| `EVENTS.ENDED`              | 停止                               | 见下表                                           |
| `EVENTS.TIMEUPDATE`         | 进度更新                           | 见下表                                           |
| `EVENTS.ERROR`              | 错误                               | 见下表                                           |
| `EVENTS.WAITING`            | 缓冲                               | 见下表                                           |
| `EVENTS.REQUEST_PLAY`       | 用户触发播放                       | `void`                                           |
| `EVENTS.QUALITY_CHANGE`     | 清晰度切换                         | `{quality: string, prevQuality: string}`         |
| `EVENTS.PLAY_COUNT`         | 播放一次                           | `void`                                           |
| `EVENTS.PLAY_FAILED`        | 播放失败                           | `{currentTime: number}`                          |
| `EVENTS.ENTER_FULLSCREEN`   | 进入全屏                           | `void`                                           |
| `EVENTS.EXIT_FULLSCREEN`    | 退出全屏                           | `void`                                           |
| `EVENTS.ENTER_PIP`          | 进入画中画                         | `void`                                           |
| `EVENTS.EXIT_PIP`           | 退出画中画                         | `void`                                           |
| `EVENTS.SHOW_CONTROLLER`    | 显示播放器进度条控件               | `void`                                           |
| `EVENTS.HIDE_CONTROLLER`    | 隐藏播放器进度条控件               | `void`                                           |
| `EVENTS.HOVER_PROGRESS_DOT` | 鼠标悬停播放节点                   | `{startTime: number, left: number, top: number}` |
| `EVENTS.LEAVE_PROGRESS_DOT` | 鼠标离开播放节点                   | `void`                                           |
| `EVENTS.SUBSCRIPTION_READY` | 播放器事件注册完成，可监听 ACTIONS | `void`                                           |

#### DOM 类 data

| 字段          | 类型                                                      | 说明                                               |
| ------------- | --------------------------------------------------------- | -------------------------------------------------- |
| `currentTime` | `number`                                                  | 当前时间                                           |
| `duration`    | `number`                                                  | 视频总时长                                         |
| `videoWidth`  | `number`                                                  | 视频宽度                                           |
| `videoHeight` | `number`                                                  | 视频高度                                           |
| `error`       | `{code: number, message: string, name: stirng}` 或 `null` | [`HTMLMediaElement.error`][htmlmediaelement-error] |

[htmlmediaelement-error]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/error 'HTMLMediaElement.error'

### ACTIONS

往播放器发送的事件

| `messageName`              | 说明                 | `data`                                                |
| -------------------------- | -------------------- | ----------------------------------------------------- |
| `ACTIONS.PLAY`             | 播放                 | `void`                                                |
| `ACTIONS.PAUSE`            | 暂停                 | `{dontApplyOnFullScreen: boolean}` 是否应用于全屏视频 |
| `ACTIONS.SET_VOLUME`       | 设置音量             | `{volume: number}` 音量值，0 到 1                     |
| `ACTIONS.ENTER_FULLSCREEN` | 进入全屏             | `void`                                                |
| `ACTIONS.EXIT_FULLSCREEN`  | 退出全屏             | `void`                                                |
| `ACTIONS.TIME_UPDATE`      | 设置视频播放进度     | `{currentTime: number}` 设置视频当前的进度            |
| `ACTIONS.SHOW_CONTROLLER`  | 显示播放器进度条控件 | `void`                                                |
