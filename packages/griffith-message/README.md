# griffith-message

English | [简体中文](./README-zh-Hans.md)

Griffith message communication plugin

## Usage

```js
import {EVENTS, ACTIONS, createMessageHelper} from 'griffith-message'
```

### createMessageHelper

Cross-window communication

```js
const {subscribeMessage, dispatchMessage} = createMessageHelper(
  id,
  targetOrigin,
  validateId
)
```

| Name         | Type               | Description                                                                                                                         |
| ------------ | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| id           | `string \| number` | Unique identifier, each message will contain this id, the receiver can be used to verify.                                           |
| targetOrigin | `object`           | The targetOrigin parameter when sending a message. If it is not empty, it will check if the origin of the sent message is the same. |
| validateId   | `boolean`          | Will check if the id of the incoming message is the same as the id of the first parameter.                                          |

#### subscribeMessage

```js
const subscription = subscribeMessage((messageName, data, sourceWindow) => {
  // do something
})

subscription.unsubscribe()
```

| Name         | Type                 | Description                                |
| ------------ | -------------------- | ------------------------------------------ |
| messageName  | `string`             | Message Name                               |
| data         | `object`             | Message attached data                      |
| sourceWindow | `MessageEventSource` | [Message Event Source][messageeventsource] |

[messageeventsource]: https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent/source 'MessageEventSource'

#### dispatchMessage

```js
dispatchMessage(targetWindow, messageName, data)
```

| Name         | Type     | Description           |
| ------------ | -------- | --------------------- |
| targetWindow | `Window` | Target Window         |
| messageName  | `string` | Message Name          |
| data         | `object` | Message attached data |

### EVENTS

Events received from the player

| `messageName`                      | Description                          | `data`                                           |
| ---------------------------------- | ------------------------------------ | ------------------------------------------------ |
| `EVENTS.DOM.PLAY`                  | Play                                 | see DOM type data table                          |
| `EVENTS.DOM.PLAYING`               | Resume playback from pause or buffer | see DOM type data table                          |
| `EVENTS.DOM.PAUSE`                 | Pause                                | see DOM type data table                          |
| `EVENTS.DOM.ENDED`                 | Ended                                | see DOM type data table                          |
| `EVENTS.DOM.TIMEUPDATE`            | Timeupdate                           | see DOM type data table                          |
| `EVENTS.DOM.ERROR`                 | Error                                | see DOM type data table                          |
| `EVENTS.DOM.WAITING`               | Buffer                               | see DOM type data table                          |
| `EVENTS.PLAYER.REQUEST_PLAY`       | User starts playback                 | null                                             |
| `EVENTS.PLAYER.QUALITY_CHANGE`     | Play quality switching               | `{quality: string, prevQuality: string}`         |
| `EVENTS.PLAYER.PLAY_COUNT`         | Playback                             | null                                             |
| `EVENTS.PLAYER.PLAY_FAILED`        | Play failed                          | `{currentTime: number}`                          |
| `EVENTS.PLAYER.ENTER_FULLSCREEN`   | Enter Fullscreen                     | null                                             |
| `EVENTS.PLAYER.EXIT_FULLSCREEN`    | Exit Fullscreen                      | null                                             |
| `EVENTS.PLAYER.ENTER_PIP`          | Enter Picture in Picture             | null                                             |
| `EVENTS.PLAYER.EXIT_PIP`           | Exit Picture in Picture              | null                                             |
| `EVENTS.PLAYER.SHOW_CONTROLLER`    | Show Controller                      | null                                             |
| `EVENTS.PLAYER.HIDE_CONTROLLER`    | Hide Controller                      | null                                             |
| `EVENTS.PLAYER.HOVER_PROGRESS_DOT` | Mouse hover progress dot             | `{startTime: number, left: number, top: number}` |
| `EVENTS.PLAYER.LEAVE_PROGRESS_DOT` | Mouse leave progress dot             | null                                             |

#### DOM type data

| Name          | Type                                                      | Description                                        |
| ------------- | --------------------------------------------------------- | -------------------------------------------------- |
| `currentTime` | `number`                                                  | Current time                                       |
| `duration`    | `number`                                                  | Total video duration                               |
| `error`       | `{code: number, message: string, name: stirng}` or `null` | [`HTMLMediaElement.error`][htmlmediaelement-error] |

[htmlmediaelement-error]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/error 'HTMLMediaElement.error'

### ACTIONS

Event sent to the player

| `messageName`                     | Description      | `data`                                                      | Status    |
| --------------------------------- | ---------------- | ----------------------------------------------------------- | --------- |
| `ACTIONS.PLAYER.PLAY`             | Play             | `{applyOnFullScreen: boolean}` Applied to full screen video | TODO      |
| `ACTIONS.PLAYER.PAUSE`            | Pause            | Applied to full screen video                                | SUPPORTED |
| `ACTIONS.PLAYER.SET_VOLUME`       | Set the volume   | `{volume: number}` Volume value from 0 to 1                 | TODO      |
| `ACTIONS.PLAYER.ENTER_FULLSCREEN` | Enter fullScreen | null                                                        | SUPPORTED |
| `ACTIONS.PLAYER.EXIT_FULLSCREEN`  | Exit fullscreen  | null                                                        | SUPPORTED |
| `ACTIONS.PLAYER.TIME_UPDATE`      | Set current time | `{currentTime: number} Set the currentTime`                 | SUPPORTED |
| `ACTIONS.PLAYER.SHOW_CONTROLLER`  | Show Controller  | null                                                        | SUPPORTED |
