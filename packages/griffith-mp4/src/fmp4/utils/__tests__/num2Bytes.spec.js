import {num2FourBytes, num2EightBytes} from '..'

describe('num2FourBytes', () => {
  it('should convert four bytes', () => {
    expect(num2FourBytes(60095)).toEqual(
      new Uint8Array([0x00, 0x00, 0xea, 0xbf])
    )
    expect(num2FourBytes(2)).toEqual(new Uint8Array([0x00, 0x00, 0x00, 0x02]))
    expect(num2FourBytes(0)).toEqual(new Uint8Array([0, 0, 0, 0]))
  })

  it('should convert eight bytes', () => {
    expect(num2EightBytes(60095)).toEqual(
      new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xea, 0xbf])
    )
    expect(num2EightBytes(2)).toEqual(
      new Uint8Array([0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02])
    )
    expect(num2EightBytes(0)).toEqual(new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]))
  })
})
