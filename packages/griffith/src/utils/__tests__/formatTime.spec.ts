import formatTime from '../formatTime'

describe('format time', () => {
  it('undefined', () => {
    expect(formatTime(undefined)).toBe('')
  })

  it('infinity', () => {
    expect(formatTime(Infinity)).toBe('')
  })

  it('zero', () => {
    expect(formatTime(0)).toBe('00:00')
  })

  it('x秒', () => {
    expect(formatTime(1.521073)).toBe('00:01')
  })

  it('x十秒', () => {
    expect(formatTime(35.733682147165254)).toBe('00:35')
  })

  it('x分钟', () => {
    expect(formatTime(107.755624)).toBe('01:47')
  })

  it('十x分钟', () => {
    expect(formatTime(707.755624)).toBe('11:47')
  })
})
