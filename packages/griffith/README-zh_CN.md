# griffith

[English](./README.md) | 简体中文

## 使用方法

```bash
yarn add griffith
# Griffith 播放 M3U8 视频依赖 hls.js。如果不想安装 hls.js，请看 README 的「构建选项」部分。
```

```js
import Player from 'griffith'

render(<Player {...props} />)
```

### `props`

| 字段                  | 类型                                              | 默认值    | 说明                                       |
| --------------------- | ------------------------------------------------- | --------- | ------------------------------------------ |
| `id`                  | `string`                                          |           | 播放器实例唯一标识                         |
| `title`               | `string`                                          |           | 视频标题                                   |
| `cover`               | `string`                                          |           | 视频封面图片 URL                           |
| `duration`            | `number`                                          |           | 初始视频时长。在视频元数据载入后使用实际值 |
| `sources`             | `sources`                                         |           | 视频播放数据。具体见下,                    |
| `standalone`          | `boolean`                                         | `false`   | 是否启用 standalone 模式                   |
| `onBeforePlay`        | `function`                                        | `void`    | 视频播放之前回调函数                       |
| `shouldObserveResize` | `boolean`                                         | `false`   | 是否监听窗口 resize                        |
| `initialObjectFit`    | `fill \| \contain \| cover \| none \| scale-down` | `contain` | object-fit 参数                            |
| `useMSE`              | `boolean`                                         | `false`   | 是否启用 MSE                               |
| `locale`              | `en \| zh_cn`                                     | `en`      | 界面语言                                   |

`sources` 字段：

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

### standalone 模式

standalone 模式表示播放器是所在文档的唯一内容，这种使用场景一般是作为 iframe 的内部页面。

standalone 模式下的行为有：

- 会将文档的标题设置为视频的标题。
- 启用快捷键支持（监听 document 上的 keydown 事件）。
- 会向父级页面发送 message，iframe 所在的页面可以监听这些事件，与播放器进行通信。

### 与播放器进行跨窗口通信

使用 [griffith-message](../packages/griffith-message#README)

## 构建选项

为了支持 M3U8 视频，我们依赖了 [hls.js](https://github.com/video-dev/hls.js/)。hls.js 体积较大，如果你不想把 hls.js 构建进应用，可以使用以下方法：

### 使用 webpack 的 external 选项

在 webpack 配置中添加如下选项：

```js
externals: {
  'hls.js/dist/hls.light.min': 'Hls',
},
```

然后在 html 中手动加载 hls.js：

```html
<script src="https://unpkg.com/hls.js@0.7.11/dist/hls.light.min.js"></script>
```

### 去除 M3U8 支持

如果你确定不会支持 M3U8 视频，可以不打包 hls.js。

在 webpack 配置中添加如下选项：

```javascript
plugins: [
  new webpack.DefinePlugin({
    __WITHOUT_HLSJS__: JSON.stringify(true),
  }),
],
```

注意：在这种情况下，如果试图播放 M3U8 视频，会发出错误警告。

## 技术细节

### 底层技术关系

| 格式 \ 实现 | 原生       | Media Source Extension (MSE)                   |
| ----------- | ---------- | ---------------------------------------------- |
| M3U8        | 原生 HLS   | [hls.js](https://github.com/video-dev/hls.js/) |
| 单文件      | 直接播放） | TODO                                           |

### 判断是否原生支持 HLS

```js
document.createElement('video').canPlayType('application/vnd.apple.mpegURL')
```

目前原生支持的浏览器大概有：Safari、Edge、Chrome、Chrome for Android。

### 判断是否支持 MSE

[hls.js 的 `Hls.isSupported()` 方法](https://github.com/video-dev/hls.js/blob/master/src/is-supported.js)就是用来判断是否支持 MSE 的。

<details>

<summary>具体代码</summary>

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

支持情况：https://caniuse.com/#feat=mediasource

### 清晰度切换

后端会返回多个清晰的 URL，用户可以手动切换清晰度，播放器也可以自动切换清晰度。

#### HLS

HLS 通过 M3U8 的嵌套实现自动清晰度切换将多个播放器的 M3U8 地址放在同一个 M3U8 文件中，并标记清晰度和码率字段，原生和 hls.js 都支持这种方式自动切换清晰度。
具体实现可以看 `utils/createMasterM3U8.js` 代码。

#### 单文件

浏览器原生不支持自动切换清晰度，只能手动切换。

要实现自动切换清晰度只能通过 MSE。

## 开发

```bash
yarn
yarn start
```

打开播放器页面：http://localhost:8000
