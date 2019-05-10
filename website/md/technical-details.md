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
