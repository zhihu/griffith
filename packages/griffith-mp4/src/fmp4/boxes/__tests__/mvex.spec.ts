import mvex from '../mvex'
import {audioData} from './__mocks__/data'

describe('mvex', () => {
  it('should get mvex box size', () => {
    // prettier-ignore
    expect(mvex(audioData).length).toBe(88)
  })
})
