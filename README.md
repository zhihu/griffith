<h1 align="center">
  <img src="https://zhstatic.zhihu.com/cfe/griffith/griffith-banner.png" height="200" width="200"/>
  <p align="center" style="font-size: 0.5em">React-based web video player</p>
</h1>

English | [简体中文](./README-zh_CN.md)

# Introduction

<p align="center">
  <img src="https://zhstatic.zhihu.com/cfe/griffith/player.png"/>
</p>

- **Streaming:** griffith makes streaming easy. Whether your video format is mp4 or hls, griffith can use Media Source Extension (MSE) for segment loading.
- **Extensibility:** griffith makes it simple to support video features in React apps. It also supports the UMD (Universal Module Definition) patterns for use directly in the browser if your application is not based on React.
- **Reliability:** griffith has been widely used in the web and mobile web of zhihu.

## Usage

### React application

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

Griffith is a mono-repo and use [Yarn workspace](https://yarnpkg.com/lang/en/docs/workspaces/) and [monorepo](https://github.com/lerna/lerna).

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

Read our [contributing guide](./CONTRIBUTING.md) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes to griffith.

### Contributor

- Cheng Wang
- Wuhao Liu
- Xiaoyan Li
- Tianxiao Wang
- Xiaoshuang Bai (Designer)

## LICENSE

MIT
