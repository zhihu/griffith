import formatDuration from '../formatDuration'

describe('format time', () => {
  it('undefined', () => {
    expect(formatDuration(undefined as never)).toBe('')
  })

  it('infinity', () => {
    expect(formatDuration(Infinity)).toBe('')
  })

  it('zero', () => {
    expect(formatDuration(0)).toBe('00:00')
  })

  it('x秒', () => {
    expect(formatDuration(1.521073)).toBe('00:01')
  })

  it('x十秒', () => {
    expect(formatDuration(35.733682147165254)).toBe('00:35')
  })

  it('x分钟', () => {
    expect(formatDuration(107.755624)).toBe('01:47')
  })

  it('十x分钟', () => {
    expect(formatDuration(707.755624)).toBe('11:47')
  })
})
