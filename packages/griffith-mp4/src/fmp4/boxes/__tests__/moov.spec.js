import moov from '../moov'
import {audioData} from './__mocks__/data'

describe('moov', () => {
  it('should get moov box size', () => {
    expect(moov(audioData).length).toBe(1154)
  })
})
