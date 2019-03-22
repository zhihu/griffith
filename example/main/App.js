import React from 'react'
import {hot} from 'react-hot-loader'

const App = () => (
  <div className="main">
    <a href="./mp4.html">mp4 video without media source extensions</a>
    <a href="./fmp4.html">mp4 video with media source extensions</a>
    <a href="./hls.html">hls video with media source extensions</a>
    <a href="./inline.html">inline video</a>
    <a href="./iframe.html">iframe video</a>
  </div>
)

export default hot(module)(App)
