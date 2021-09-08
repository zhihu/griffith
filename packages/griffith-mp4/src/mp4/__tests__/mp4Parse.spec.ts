import readChunk from 'read-chunk'
import path from 'path'
import MP4Parse from '../mp4Parse'

function loadMP4Data(url, dataLength) {
  return new Promise(resolve => {
    const ab = readChunk.sync(url, 0, dataLength)
    resolve(ab)
  })
}

describe('MP4Parse', () => {
  it('should parse mp4 box', async () => {
    const mp4Body = await loadMP4Data(
      path.resolve(__dirname, '__mocks__', 'zhihu.mp4'),
      9500
    )
    const mp4 = new MP4Parse(mp4Body)
    expect(mp4.mp4BoxTreeObject).toMatchSnapshot()
  })

  it('should parse mp4 box 2', async () => {
    const mp4Body = await loadMP4Data(
      path.resolve(__dirname, '__mocks__', 'zhihu2.mp4'),
      9500
    )
    const mp4 = new MP4Parse(mp4Body)
    expect(mp4.mp4BoxTreeObject).toMatchSnapshot()
  })
})
