# griffith-standalone

[English](./README.md) | 简体中文

包含了 React 等所有依赖的 Griffith。可以直接在 HTML 文件中添加 `script` 标签来使用。

```html
<div id="player"></div>
<script src="https://unpkg.com/griffith-standalone/dist/index.umd.min.js"></script>
<script>
  const target = document.getElementById('player')

  const sources = {
    hd: {
      play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4',
    },
    sd: {
      play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_sd.mp4',
    },
  }

  // 创建播放器
  const player = Griffith.createPlayer(target)

  // 载入视频
  player.render({sources})

  // 销毁视频
  player.dispose()
</script>
```

`props` 的定义请看 [Griffith 的文档](../packages/griffith#readme)。
