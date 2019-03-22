import moof from '../moof'
import {audioData} from './__mocks__/data'

describe('moof', () => {
  it('should get moof box size', () => {
    expect(moof(audioData).length).toBe(5235)
  })
})
