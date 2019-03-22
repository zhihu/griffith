import mdat from '../mdat'

describe('mdat box', () => {
  const data = [1, 2, 3, 4]
  it('should be same', () => {
    // prettier-ignore
    expect(mdat(data)).toEqual(new Uint8Array([
      0x00, 0x00, 0x00, 0x0c, 
      0x6D, 0x64, 0x61, 0x74,
      0x01, 0x02, 0x03, 0x04,
    ]))
  })
})
