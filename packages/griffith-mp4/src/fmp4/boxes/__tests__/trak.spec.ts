import trak from '../trak'
import {audioData} from './__mocks__/data'

describe('trak', () => {
  it('should get trak box size', () => {
    // prettier-ignore
    expect(trak(audioData).length).toBe(436)
  })
})
