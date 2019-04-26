import React from 'react'
import './Features.css'

const Features = () => (
  <section className="features-grid">
    <div>
      <h3>Streaming</h3>
      <p>
        Griffith makes streaming easy. Whether your video format is mp4 or hls,
        Griffith can use Media Source Extension (MSE) for segment loading.
      </p>
    </div>
    <div>
      <h3>Extensibility</h3>
      <p>
        Griffith makes it simple to support video features in React apps. It
        also supports the UMD (Universal Module Definition) patterns for direct
        use in the browser if your application is not based on React.
      </p>
    </div>
    <div>
      <h3>Reliability</h3>
      <p>
        Griffith has been widely used in the web and mobile web of{' '}
        <a
          href="https://www.zhihu.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Zhihu
        </a>
        .
      </p>
    </div>
  </section>
)

export default Features
