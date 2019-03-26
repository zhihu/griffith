import sequence from '../sequence'

test('sequence', () => {
  const fn1 = jest.fn(() => 1)
  const fn2 = jest.fn(() => 2)
  expect(sequence(fn1, fn2)('foo', 'bar')).toBe(2)
  expect(fn1).toHaveBeenCalledWith('foo', 'bar')
  expect(fn2).toHaveBeenCalledWith('foo', 'bar')
})
