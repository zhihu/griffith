import {mehd} from '../mvex'

describe('mehd', () => {
  it('should get mehd box buffer', () => {
    // prettier-ignore
    expect(mehd({duration: 440320})).toEqual(new Uint8Array([
      0x00, 0x00, 0x00, 0x10,   // size
      0x6D, 0x65, 0x68, 0x64,   // mehd
      0x00, 0x00, 0x00, 0x00,   // version + flag
      0x00, 0x06, 0xB8, 0x00,   // duration
    ]))
  })
})
