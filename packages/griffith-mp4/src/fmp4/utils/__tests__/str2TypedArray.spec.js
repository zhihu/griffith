import {str2TypedArray} from '..'

describe('str2TypedArray', () => {
  it('should be exactly same', () => {
    expect(str2TypedArray('abcd')).toEqual(
      new Uint8Array([0x61, 0x62, 0x63, 0x64])
    )
  })
})
