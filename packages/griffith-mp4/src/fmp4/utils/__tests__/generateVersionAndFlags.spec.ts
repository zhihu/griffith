import {generateVersionAndFlags} from '..'

describe('generateVersionAndFlags', () => {
  it('should genrate veraion and flags', () => {
    expect(generateVersionAndFlags(0, 0)).toEqual(
      new Uint8Array([0x00, 0x00, 0x00, 0x00])
    )
    expect(generateVersionAndFlags(0, 7)).toEqual(
      new Uint8Array([0x00, 0x00, 0x00, 0x07])
    )
    expect(generateVersionAndFlags(10, 155)).toEqual(
      new Uint8Array([0x0a, 0x00, 0x00, 0x9b])
    )
  })
})
