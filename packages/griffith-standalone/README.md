# griffith-standalone

English | [简体中文](./README-zh_CN.md)

Griffith bundled with React, React DOM and other dependencies. You can use it by add a `script` tag in your HTML file.

```html
<div id="player"></div>
<script src="https://unpkg.com/griffith-standalone/dist/index.umd.min.js" />
<script>
  const target = document.getElementById('player')

  // create player instance
  const player = Griffith.createPlayer(element, options)

  // load video
  player.render(props)

  // dispose video
  player.dispose()
</script>
```

Read [Griffith docs](../packages/griffith#readme) to know about `options` and `props`.
