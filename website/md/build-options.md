We rely on [hls.js](https://github.com/video-dev/hls.js/) to play M3U8 format video. If you don't want to build hls.js into your app, you can use the following methods:

### Use the external option of webpack

Add the following options to your webpack configuration:

```js
externals: {
  'hls.js/dist/hls.light.min': 'Hls',
},
```

Then manually load hls.js in html:

```html
<script src="https://unpkg.com/hls.js@0.7.11/dist/hls.light.min.js"></script>
```

### Remove M3U8 support

If you are sure that you will not support M3U8 video, you may not use hls.js.

Add the following options to your webpack configuration:

```js
resolve: {
  alias: {
    'griffith-hls': false,
  },
},
```

Note: In this case, an error warning is issued if an attempt is made to play an M3U8 video.
