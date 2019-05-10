```bash
yarn add griffith
# Griffith uses hls.js to play m3u8 format video.
# If you don't want to install hls.js, please ref the build part.
```

```js
import Player from 'griffith'

render(<Player {...props} />)
```

### `Props`

| Name                  | Type                                             | Default   | Description                                                              |
| --------------------- | ------------------------------------------------ | --------- | ------------------------------------------------------------------------ |
| `id`                  | `string`                                         |           | Unique identifier of the player instance                                 |
| `title`               | `string`                                         |           | Video title                                                              |
| `cover`               | `string`                                         |           | Video cover image                                                        |
| `duration`            | `number`                                         |           | Initial video duration. Use actual values after video metadata is loaded |
| `sources`             | `sources`                                        |           | Video playback data                                                      |
| `standalone`          | `boolean`                                        | `false`   | Enable standalone mode                                                   |
| `onBeforePlay`        | `function`                                       | `void`    | Callback function before video playback                                  |
| `shouldObserveResize` | `boolean`                                        | `false`   | Listen to the window resize                                              |
| `initialObjectFit`    | `fill \| contain \| cover \| none \| scale-down` | `contain` | object-fit                                                               |
| `useMSE`              | `boolean`                                        | `false`   | Enable Media Source Extensions™                                          |
| `locale`              | `en \| ja \| zh-Hans \| zh-Hant`                 | `en`      | UI Locale                                                                |

`sources`:

```ts
interface sources {
  [key in ('ld' | 'sd' | 'hd')]: {
    bitrate?: number
    duration?: number
    format?: string
    height?: number
    width?: number
    play_url: string
    size?: number
  }
}
```

### Standalone mode

The standalone mode indicates that the player is the only content of the document and is generally used as an internal page of the iframe.

The behavior in standalone mode is:

- Will set the title of the document to the title of the video.
- Enable shortcut support (listen to the keydown event on document).
- Will send a message to the parent page, the parent page can listen to these events and then communicate with the player.

### Cross-window meesage with player

use [griffith-message](../packages/griffith-message#README)
