import {concatTypedArray} from '..'

describe('concat typed array', () => {
  it('no args', () => {
    expect(concatTypedArray()).toEqual(new Uint8Array())
  })

  it('one arg', () => {
    expect(concatTypedArray(new Uint8Array([1, 2, 3, 4]))).toEqual(
      new Uint8Array([1, 2, 3, 4])
    )
  })

  it('more than 2 args', () => {
    expect(
      concatTypedArray(
        [1, 2, 3, 4],
        new Uint8Array([5, 6, 7, 8]),
        new Uint8Array([9, 10, 11, 12])
      )
    ).toEqual(new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]))
  })
})
