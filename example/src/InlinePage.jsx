import React from 'react'
import PlayerContainer, {Layer} from 'griffith'

const watermarkStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  color: 'white',
  borderRadius: '5px',
  margin: '5px',
  padding: '5px',
  display: 'inline-block',
}

const VideoCard = ({data, height = 'auto', objectFit}) => (
  <div
    className="VideoCard"
    style={{height, width: '320px', margin: '20px auto'}}
  >
    <PlayerContainer {...data} initialObjectFit={objectFit}>
      <Layer>
        <span style={watermarkStyle}>水印示例</span>
      </Layer>
    </PlayerContainer>
  </div>
)

class App extends React.Component {
  render() {
    const duration = 182

    const sources = {
      hd: {
        bitrate: 2005,
        size: 46723282,
        duration,
        format: 'fmp4',
        width: 1280,
        height: 720,
        play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4',
      },
      sd: {
        bitrate: 900.49,
        size: 20633151,
        duration,
        format: 'fmp4',
        width: 848,
        height: 478,
        play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_sd.mp4',
      },
    }

    const data = {
      id: 'zhihu2018',
      title: '2018 我们如何与世界相处？',
      cover: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018.jpg',
      duration,
      sources,
      src: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_sd.mp4',
    }

    return (
      <div style={{maxWidth: 600, margin: '0 auto'}}>
        <h1>行内视频示例</h1>
        <p>视频原始比例为 16:9</p>
        <p>暂时只支持 contain 和 cover 两种情况</p>
        <hr />
        <section>
          <h2>正方形播放器</h2>
          <h3>object-fit: contain (default)</h3>
          <p>预期：视频上下黑边；水印相对视频画面定位</p>
          <VideoCard data={data} height={320} />
          <h3>object-fit: cover</h3>
          <p>预期：视频左右裁切；水印相对播放器定位</p>
          <VideoCard data={data} height={320} objectFit="cover" />
        </section>
        <hr />
        <section>
          <h2>2:1 播放器</h2>
          <h3>object-fit: contain (default) </h3>
          <p>预期：视频左右黑边；水印相对视频画面定位</p>
          <VideoCard data={data} height={160} />
          <h3>object-fit: cover</h3>
          <p>预期：视频上下裁切；水印相对播放器定位</p>
          <VideoCard data={data} height={160} objectFit="cover" />
        </section>
        <hr />
        <section>
          <h2>不指定高度</h2>
          <p>预期：高度自适应</p>
          <VideoCard data={data} />
        </section>
      </div>
    )
  }
}

export default App
