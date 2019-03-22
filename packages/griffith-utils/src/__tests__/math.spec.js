import {getGCD, reduce} from '../math'

describe('getGCD', () => {
  it('should get greatest common divisor', () => {
    expect(getGCD(1, 2)).toBe(1)
    expect(getGCD(2, 4)).toBe(2)
    expect(getGCD(18, 27)).toBe(9)
    expect(getGCD(28, 21)).toBe(7)
  })

  it('should always get positive number', () => {
    expect(getGCD(18, -27)).toBe(9)
    expect(getGCD(-28, 21)).toBe(7)
  })

  it('should return the other one if either param is zero', () => {
    expect(getGCD(12345, 0)).toBe(12345)
    expect(getGCD(0, 100)).toBe(100)
    expect(getGCD(0, 0)).toBe(0)
  })

  it('should throw if either param is not a interger', () => {
    expect(() => getGCD(1, 1.234)).toThrow()
    expect(() => getGCD(1, Infinity)).toThrow()
    expect(() => getGCD(1, NaN)).toThrow()

    expect(() => getGCD(1, 'foo')).toThrow()
    expect(() => getGCD(1, {})).toThrow()

    expect(() => getGCD(1, null)).toThrow()
    expect(() => getGCD(1, undefined)).toThrow()
  })
})

describe('reduce', () => {
  it('should reduce two numbers', () => {
    expect(reduce(1, 2)).toEqual([1, 2])
    expect(reduce(2, 4)).toEqual([1, 2])
    expect(reduce(18, 27)).toEqual([2, 3])
    expect(reduce(28, 21)).toEqual([4, 3])
  })

  it('should reduce negetive numbers correctly', () => {
    expect(reduce(-2, -4)).toEqual([-1, -2])
    expect(reduce(-18, 27)).toEqual([-2, 3])
    expect(reduce(28, -21)).toEqual([4, -3])
  })

  it('should thorw if either param is zero', () => {
    expect(() => reduce(12345, 0)).toThrow()
    expect(() => reduce(0, 100)).toThrow()
    expect(() => reduce(0, 0)).toThrow()
  })

  it('should throw if either param is not interger', () => {
    expect(() => reduce(1, 1.234)).toThrow()
    expect(() => reduce(1, Infinity)).toThrow()
    expect(() => reduce(1, NaN)).toThrow()

    expect(() => reduce(1, 'foo')).toThrow()
    expect(() => reduce(1, {})).toThrow()

    expect(() => reduce(1, null)).toThrow()
    expect(() => reduce(1, undefined)).toThrow()
  })
})
