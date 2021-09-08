import formatPercent from '../formatPercent'

describe('formatPercent', () => {
  it('should get percentage', () => {
    expect(formatPercent(10, 100)).toBe('10%')
  })

  it('should get percentage without total number', () => {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
    expect(formatPercent(10)).toBe('0%')
  })
})
