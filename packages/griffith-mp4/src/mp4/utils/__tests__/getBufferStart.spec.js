import {getBufferStart} from '..'
import mp4BoxTree from '../../__tests__/__mocks__/mp4BoxTree'

describe('getBufferStart', () => {
  it('should get first buffer start', () => {
    expect(getBufferStart(mp4BoxTree)).toBe(9271)
  })

  it('should get last buffer start', () => {
    expect(getBufferStart(mp4BoxTree, 229, 395)).toBe(588544)
  })
})
