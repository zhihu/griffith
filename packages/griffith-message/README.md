# griffith-message

English | [简体中文](./README-zh-Hans.md)

Griffith message communication plugin

## Usage

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

### createMessageHelper

Cross-window communication

```ts
createMessageHelper(id?, targetOrigin?, shouldValidateId?)
```

| Name               | Type               | Description                                                                                                                           |
| ------------------ | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| `id`               | `string \| number` | Unique identifier, each message will contain this id, the receiver can be used to verify.                                             |
| `targetOrigin`     | `object`           | The `targetOrigin` parameter when sending a message. If it is not empty, it will check if the origin of the sent message is the same. |
| `shouldValidateId` | `boolean`          | Will check if the id of the incoming message is the same as the id of the first parameter.                                            |

#### subscribeMessage

```ts
subscribeMessage(name: EVENTS, (data?: object, source?: MessageEventSource) => void): () => void
```

| Name     | Type                 | Description                                |
| -------- | -------------------- | ------------------------------------------ |
| `name`   | `EVENTS`             | Message Name                               |
| `data`   | `object`             | Message attached data                      |
| `source` | `MessageEventSource` | [Message Event Source][messageeventsource] |

[messageeventsource]: https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent/source 'MessageEventSource'

#### dispatchMessage

```ts
dispatchMessage(target: Window, name: ACTIONS, data?: object): void
```

| Name     | Type      | Description           |
| -------- | --------- | --------------------- |
| `target` | `Window`  | Target Window         |
| `name`   | `ACTIONS` | Message Name          |
| `data`   | `object`  | Message attached data |

### EVENTS

Events received from the player

| `messageName`               | Description                          | `data`                                           |
| --------------------------- | ------------------------------------ | ------------------------------------------------ |
| `EVENTS.CANPLAY`            | canplay                              | see DOM type data table                          |
| `EVENTS.PLAY`               | Play                                 | see DOM type data table                          |
| `EVENTS.PLAYING`            | Resume playback from pause or buffer | see DOM type data table                          |
| `EVENTS.PAUSE`              | Pause                                | see DOM type data table                          |
| `EVENTS.ENDED`              | Ended                                | see DOM type data table                          |
| `EVENTS.TIMEUPDATE`         | Timeupdate                           | see DOM type data table                          |
| `EVENTS.ERROR`              | Error                                | see DOM type data table                          |
| `EVENTS.WAITING`            | Buffer                               | see DOM type data table                          |
| `EVENTS.REQUEST_PLAY`       | User starts playback                 | null                                             |
| `EVENTS.QUALITY_CHANGE`     | Play quality switching               | `{quality: string, prevQuality: string}`         |
| `EVENTS.PLAY_COUNT`         | Playback                             | null                                             |
| `EVENTS.PLAY_FAILED`        | Play failed                          | `{currentTime: number}`                          |
| `EVENTS.ENTER_FULLSCREEN`   | Enter Fullscreen                     | null                                             |
| `EVENTS.EXIT_FULLSCREEN`    | Exit Fullscreen                      | null                                             |
| `EVENTS.ENTER_PIP`          | Enter Picture in Picture             | null                                             |
| `EVENTS.EXIT_PIP`           | Exit Picture in Picture              | null                                             |
| `EVENTS.SHOW_CONTROLLER`    | Show Controller                      | null                                             |
| `EVENTS.HIDE_CONTROLLER`    | Hide Controller                      | null                                             |
| `EVENTS.HOVER_PROGRESS_DOT` | Mouse hover progress dot             | `{startTime: number, left: number, top: number}` |
| `EVENTS.LEAVE_PROGRESS_DOT` | Mouse leave progress dot             | null                                             |
| `EVENTS.SUBSCRIPTION_READY` | Action subscription ready            | `void`                                           |

#### DOM type data

| Name          | Type                                                      | Description                                        |
| ------------- | --------------------------------------------------------- | -------------------------------------------------- |
| `currentTime` | `number`                                                  | Current time                                       |
| `duration`    | `number`                                                  | Total video duration                               |
| `error`       | `{code: number, message: string, name: stirng}` or `null` | [`HTMLMediaElement.error`][htmlmediaelement-error] |

[htmlmediaelement-error]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/error 'HTMLMediaElement.error'

### ACTIONS

Actions sent to the player

| `messageName`              | Description      | `data`                                                                   |
| -------------------------- | ---------------- | ------------------------------------------------------------------------ |
| `ACTIONS.PLAY`             | Play             | `void`                                                                   |
| `ACTIONS.PAUSE`            | Pause            | `{dontApplyOnFullScreen: boolean}` Whether to apply to full screen video |
| `ACTIONS.SET_VOLUME`       | Set the volume   | `{volume: number}` Volume value from 0 to 1                              |
| `ACTIONS.ENTER_FULLSCREEN` | Enter fullScreen | `void`                                                                   |
| `ACTIONS.EXIT_FULLSCREEN`  | Exit fullscreen  | `void`                                                                   |
| `ACTIONS.TIME_UPDATE`      | Set current time | `{currentTime: number}` Set the current playback time                    |
| `ACTIONS.SHOW_CONTROLLER`  | Show Controller  | `void`                                                                   |
