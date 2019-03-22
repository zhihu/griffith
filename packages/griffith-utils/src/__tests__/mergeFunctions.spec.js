import mergeFunctions from '../mergeFunctions'

test('mergeFunctions', () => {
  const fn1 = jest.fn()
  const fn2 = jest.fn()
  mergeFunctions(fn1, fn2)('foo', 'bar')
  expect(fn1).toHaveBeenCalledWith('foo', 'bar')
  expect(fn2).toHaveBeenCalledWith('foo', 'bar')
})
