import getBufferedTime from '../getBufferedTime'

describe('getBufferedTime', () => {
  const currentTime = 100
  it('get buffered time', () => {
    const buffered = [{start: 0, end: 240}]
    expect(getBufferedTime(currentTime, buffered)).toBe(240)
  })

  it('return 0 when buffered is empty', () => {
    const buffered = []
    expect(getBufferedTime(currentTime, buffered)).toBe(0)
  })

  it('return 0 when buffered is less than current time', () => {
    const buffered = [{start: 0, end: 50}]
    expect(getBufferedTime(currentTime, buffered)).toBe(0)
  })
})
