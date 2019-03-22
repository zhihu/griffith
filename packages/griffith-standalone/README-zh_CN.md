# griffith-standalone

[English](./README.md) | 简体中文

包含了 React 等所有依赖的 Griffith。可以直接在 HTML 文件中添加 `script` 标签来使用。

```html
<div id="player"></div>
<script src="https://unpkg.com/griffith-standalone/dist/index.umd.min.js" />
<script>
  const target = document.getElementById('player')

  // 创建播放器
  const player = Griffith.createPlayer(element, options)

  // 载入视频
  player.render(props)

  // 销毁视频
  player.dispose()
</script>
```

options 和 props 的定义请看 [Griffith 的文档](../packages/griffith#readme)。
