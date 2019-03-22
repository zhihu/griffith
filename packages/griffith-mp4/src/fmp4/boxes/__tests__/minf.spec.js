import minf from '../minf'
import {audioData, videoData} from './__mocks__/data'

describe('minf', () => {
  it('should get audio minf box size', () => {
    // prettier-ignore
    expect(minf(audioData).length).toBe(227)
  })

  it('should get video minf box size', () => {
    // prettier-ignore
    expect(minf(videoData).length).toBe(293)
  })
})
