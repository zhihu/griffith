# griffith

English | [简体中文](./README-zh-Hans.md)

## Usage

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

| Name                      | Type                                             | Default   | Description                                                              |
| ------------------------- | ------------------------------------------------ | --------- | ------------------------------------------------------------------------ |
| `id`                      | `string`                                         |           | Unique identifier of the player instance                                 |
| `title`                   | `string`                                         |           | Video title                                                              |
| `cover`                   | `string`                                         |           | Video cover image                                                        |
| `duration`                | `number`                                         |           | Initial video duration. Use actual values after video metadata is loaded |
| `sources`                 | `sources`                                        |           | Video playback data                                                      |
| `standalone`              | `boolean`                                        | `false`   | Enable standalone mode                                                   |
| `onBeforePlay`            | `function`                                       | `void`    | Callback function before video playback                                  |
| `shouldObserveResize`     | `boolean`                                        | `false`   | Listen to the window resize                                              |
| `initialObjectFit`        | `fill \| contain \| cover \| none \| scale-down` | `contain` | object-fit                                                               |
| `useMSE`                  | `boolean`                                        | `false`   | Enable Media Source Extensions™                                          |
| `locale`                  | `en \| ja \| zh-Hans \| zh-Hant`                 | `en`      | UI Locale                                                                |
| `autoplay`                | `boolean`                                        | `false`   | Muted Autoplay                                                           |
| `disablePictureInPicture` | `boolean`                                        | `false`   | Disable Picture in Picture feature                                       |

`sources`:

```ts
interface sources {
  [key in ('ld' | 'sd' | 'hd' | 'fhd')]: {
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

## Build Options

We rely on [hls.js](https://github.com/video-dev/hls.js/) to play M3U8 format video. If you don't want to build hls.js into your app, you can use the following methods:

### Use the external option of webpack

Add the following options to your webpack configuration:

```js
externals: {
  'hls.js/dist/hls.light.min': 'Hls',
},
```

Then manually load hls.js in html:

```html
<script src="https://unpkg.com/hls.js@0.7.11/dist/hls.light.min.js"></script>
```

### Remove M3U8 support

If you are sure that you will not support M3U8 video, you may not use hls.js.

Add the following options to your webpack configuration:

```js
plugins: [
  new webpack.DefinePlugin({
    __WITHOUT_HLSJS__: JSON.stringify(true),
  }),
],
```

Note: In this case, an error warning is issued if an attempt is made to play an M3U8 video.

## technical details

| format | parse        | Media Source Extension (MSE)                         |
| ------ | ------------ | ---------------------------------------------------- |
| M3U8   | HLS          | [hls.js](https://github.com/video-dev/hls.js/)       |
| mp4    | griffith-mp4 | [griffith-mp4.js](https://github.com/zhihu/griffith) |

### Confirm whether HLS is supported

```js
document.createElement('video').canPlayType('application/vnd.apple.mpegURL')
```

Currently supported browsers are: Safari, Edge, Chrome, Chrome for Android.

### Confirm whether MSE is supported

[hls.js's `Hls.isSupported()` method](https://github.com/video-dev/hls.js/blob/master/src/is-supported.js) is used to determine whether MSE is supported.

<details>

<summary>Code</summary>

<p>

```js
function getMediaSource() {
  if (typeof window !== 'undefined') {
    return window.MediaSource || window.WebKitMediaSource
  }
}

function isSupported() {
  const mediaSource = getMediaSource()
  const sourceBuffer = window.SourceBuffer || window.WebKitSourceBuffer
  const isTypeSupported =
    mediaSource &&
    typeof mediaSource.isTypeSupported === 'function' &&
    mediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"')

  // if SourceBuffer is exposed ensure its API is valid
  // safari and old version of Chrome doe not expose SourceBuffer globally so checking SourceBuffer.prototype is impossible
  const sourceBufferValidAPI =
    !sourceBuffer ||
    (sourceBuffer.prototype &&
      typeof sourceBuffer.prototype.appendBuffer === 'function' &&
      typeof sourceBuffer.prototype.remove === 'function')
  return !!isTypeSupported && !!sourceBufferValidAPI
}
```

</p>

</details>

Support details: https://caniuse.com/#feat=mediasource

### Video quality switching

The API returns multiple quality URLs, users can manually switch video quality, and the player can automatically switch video quality.

## Development

```bash
yarn
yarn start
```

Open the player page: http://localhost:8000
