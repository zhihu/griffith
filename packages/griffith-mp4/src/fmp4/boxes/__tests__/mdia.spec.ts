import mdia from '../mdia'
import {audioData} from './__mocks__/data'

describe('mdia', () => {
  it('should get mdia box size', () => {
    expect(mdia(audioData).length).toBe(324)
  })
})
