<h1 align="center">
  <img src="https://zhstatic.zhihu.com/cfe/griffith/griffith-banner.png" height="200" width="200"/>
  <p align="center" style="font-size: 0.5em">知乎视频播放器</p>
</h1>

[English](./README.md) | 简体中文

## 简介

<p align="center">
  <img src="https://zhstatic.zhihu.com/cfe/griffith/player.png"/>
</p>

- **流式播放:** Griffith 让流式播放变得简单。无论你视频格式是 mp4 还是 hls，Griffith 都能使用媒体源拓展（MSE）来实现分段加载等功能。
- **可扩展性:** Griffith 让 React 应用接入视频播放功能变得简单。如果你的应用不基于 React，Griffith 还提供支持 standalone 模式可以免构建工具直接在浏览器中使用。
- **可靠性:** Griffith 已经大范围应用知乎的桌面和移动 web 应用中。

## 快速开始

### React 应用

```bash
$ yarn add griffith
```

```js
import Player from 'Griffith'

const sources = {
  hd: {
    play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4',
  },
  sd: {
    play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_sd.mp4',
  },
}

render(<Player sources={sources} />)
```

[查看详细使用方法](./packages/griffith/README-zh_CN.md)

**注意：暂不支持 SSR 应用**

### 非 React 应用

```html
<script src="https://unpkg.com/griffith-standalone/dist/index.umd.min.js" /></script>
```

```javascript
const sources = {
  hd: {
    play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4',
  },
  sd: {
    play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_sd.mp4',
  },
}

Griffith.createPlayer(element).render({sources})
```

[查看 Standalone 模式详细使用方法](./packages/griffith-standalone/README-zh_CN.md)

## 项目结构

Griffith 是一个 monorepo，使用了 [Yarn workspace](https://yarnpkg.com/lang/en/docs/workspaces/) 和 [Lerna](https://github.com/lerna/lerna) 进行管理。

### 核心

- `packages/griffith`: 核心代码

### 工具

- `packages/griffith-message`: 帮助进行跨窗口通信
- `packages/griffith-utils`: 公用的工具函数

### 插件

- `packages/griffith-mp4`: MP4 插件。使用了 [MediaSource API](https://developer.mozilla.org/en-US/docs/Web/API/MediaSource)
- `packages/griffith-hls`: [HLS](https://developer.apple.com/streaming/) 插件，使用了 [hls.js](https://github.com/video-dev/hls.js)

### 其他

- `example`: 示例
- `packages/griffith-standalone`: 包含了所有依赖的 UMD 包，可以免除构建工具，独立在浏览器中使用。

## 自定义构建

默认情况下，webpack 等构建工具会将 `griffith-mp4` 和 `packages/griffith-hls` 打包。你可以通过构建时注入全局变量来除去插件，从而减小打包大小。

如果你使用 webpack，可以使用 [DefinePlugin](https://webpack.js.org/plugins/define-plugin/)：

```javascript
const {DefinePlugin} = require('webpack')

module.exports = {
  plugins: [
    new DefinePlugin({
      __WITHOUT_HLSJS__: JSON.stringify(true), // 除去 griffith-hls
      __WITHOUT_MP4__: JSON.stringify(true), // 除去 griffith-mp4
    }),
  ],
}
```

注意，除去 `griffith-mp4` / `griffith-hls` 之后，除非浏览器原生支持，否则 Griffith 不能播放 MP4 / HLS 视频。

## 贡献

阅读以下内容，了解如何参与改进 Griffith。

### 贡献指南

查看我们的[贡献指南](./CONTRIBUTING-zh_CN.md)来了解我们的开发流程。

### 贡献者

- Cheng Wang
- Wuhao Liu
- Xiaoyan Li
- Tianxiao Wang
- Xiaoshuang Bai (Designer)

## 版权许可证

MIT
