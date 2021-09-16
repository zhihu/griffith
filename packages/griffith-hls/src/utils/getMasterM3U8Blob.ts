import {Source} from '../types'
import createMasterM3U8 from './createMasterM3U8'

export default (sources: Source[]): Blob => {
  const list = sources.map((item) => ({
    source: item.source,
    bandwidth: item.bitrate * 1024,

    resolution: {
      width: item.width,
      height: item.height,
    },
  }))

  return new Blob([createMasterM3U8(list)], {
    type: 'application/vnd.apple.mpegURL',
  })
}
