import {generateReserved, generatePredefined} from '..'

describe('generateBytes', () => {
  it('generateReserved', () => {
    expect(generateReserved(0)).toEqual(new Uint8Array())
    expect(generateReserved(4)).toEqual(new Uint8Array([0, 0, 0, 0]))
  })

  it('generatePredefined', () => {
    expect(generatePredefined(0)).toEqual(new Uint8Array())
    expect(generatePredefined(4)).toEqual(new Uint8Array([0, 0, 0, 0]))
  })
})
