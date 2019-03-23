<h1 align="center">
  <img src="https://zhstatic.zhihu.com/cfe/griffith/griffith-banner.png" height="200" width="200"/>
  <p align="center" style="font-size: 0.5em">A React-based web video player</p>
</h1>

[![License](https://img.shields.io/npm/l/griffith.svg)](https://github.com/zhihu/griffith/blob/master/LICENSE)
[![npm package](https://img.shields.io/npm/v/griffith/latest.svg)](https://www.npmjs.com/package/griffith)
[![Build Status](https://img.shields.io/travis/zhihu/griffith.svg)](https://travis-ci.org/zhihu/griffith)
[![codecov](https://codecov.io/gh/zhihu/griffith/branch/master/graph/badge.svg)](https://codecov.io/gh/zhihu/griffith)
![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/zhihu/griffith/blob/master/CONTRIBUTING.md)

English | [简体中文](./README-zh_CN.md)

# Introduction

<p align="center">
  <img src="https://zhstatic.zhihu.com/cfe/griffith/player.png"/>
</p>

- **Streaming:** Griffith makes streaming easy. Whether your video format is mp4 or hls, Griffith can use Media Source Extension (MSE) for segment loading.
- **Extensibility:** Griffith makes it simple to support video features in React apps. It also supports the UMD (Universal Module Definition) patterns for use directly in the browser if your application is not based on React.
- **Reliability:** Griffith has been widely used in the web and mobile web of zhihu.

## Usage

### React application

```bash
yarn add griffith
```

```js
import Player from 'griffith'

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

[Detailed usage](./packages/griffith/README.md)

**Note: SSR application is not supported**

### non-React application

```html
<script src="https://unpkg.com/griffith-standalone/dist/index.umd.min.js" /></script>
```

```js
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

[Standalone mode detailed usage](./packages/griffith-standalone/README.md)

## Project Structure

Griffith is a monorepo and use [Yarn workspace](https://yarnpkg.com/lang/en/docs/workspaces/) and [Lerna](https://github.com/lerna/lerna).

### Core

- `packages/griffith`: The core lirary

### Utilities

- `packages/griffith-message`: Helpers for cross-window message
- `packages/griffith-utils`: Utilities

### Plugins

- `packages/griffith-mp4`: MP4 plugin powered by [MediaSource API](https://developer.mozilla.org/en-US/docs/Web/API/MediaSource)
- `packages/griffith-hls`: [HLS](https://developer.apple.com/streaming/) plugin powered by [hls.js](https://github.com/video-dev/hls.js)

### Others

- `example`: example and demos
- `packages/griffith-standalone`: A UMD build that can be used without React or Webpack

## Custom Build

Build tools like webpack will include `griffith-mp4` and `packages/griffith-hls` by default. You can make your bundle smaller by exluding a plugin with build-time globals.

If you use webpack, do so with [DefinePlugin](https://webpack.js.org/plugins/define-plugin/):

```javascript
const {DefinePlugin} = require('webpack')

module.exports = {
  plugins: [
    new DefinePlugin({
      __WITHOUT_HLSJS__: JSON.stringify(true), // exludes griffith-hls
      __WITHOUT_MP4__: JSON.stringify(true), // exludes griffith-mp4
    }),
  ],
}
```

Note that without `griffith-mp4` / `griffith-hls` Griffith can no longer play MP4 / HLS media unless the browser supports it natively.

## Contributing

Read below to learn how you can take part in improving griffith.

### [Contributing Guide](./CONTRIBUTING.md)

Read our [contributing guide](./CONTRIBUTING.md) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes to Griffith.

### Contributor

- Cheng Wang
- Wuhao Liu
- Xiaoyan Li
- Tianxiao Wang
- Xiaoshuang Bai (Designer)

## LICENSE

MIT
