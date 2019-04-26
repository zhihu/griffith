griffith-standalone is a umd js file bundled with React, React DOM and other dependencies. You can use it by add a `script` tag in your HTML file.

```html
<div id="player"></div>
<script
  crossorigin
  src="https://unpkg.com/griffith-standalone/dist/index.umd.min.js"
></script>
<script>
  const target = document.getElementById('player')

  // create player instance
  const player = Griffith.createPlayer(element)

  // load video
  player.render(props)

  // dispose video
  player.dispose()
</script>
```

Read [Griffith docs](/usage/) to know about `props`.
