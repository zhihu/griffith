# griffith-standalone

English | [简体中文](./README-zh-Hans.md)

Griffith bundled with React, React DOM and other dependencies. You can use it by add a `script` tag in your HTML file.

```html
<div id="player"></div>
<script
  crossorigin
  src="https://unpkg.com/griffith-standalone/dist/index.umd.min.js"
></script>
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

  // create player instance
  const player = Griffith.createPlayer(target)

  // load video
  player.render({sources})

  // dispose video
  player.dispose()
</script>
```

Read [Griffith docs](../packages/griffith#readme) to know about `props`.
