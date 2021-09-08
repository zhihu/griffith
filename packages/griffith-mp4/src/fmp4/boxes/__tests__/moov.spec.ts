import moov from '../moov'
import {audioData} from './__mocks__/data'

describe('moov', () => {
  it('should get audio moov box size', () => {
    expect(moov(audioData, 'audio').length).toBe(652)
  })

  it('should get video moov box size', () => {
    expect(moov(audioData, 'video').length).toBe(718)
  })
})
