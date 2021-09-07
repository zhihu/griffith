import formatPercent from '../formatPercent'

describe('formatPercent', () => {
  it('should get percentage', () => {
    expect(formatPercent(10, 100)).toBe('10%')
  })

  it('should get percentage without total number', () => {
    expect(formatPercent(10)).toBe('0%')
  })
})
