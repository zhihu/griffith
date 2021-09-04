import reverseArray from '../reverseArray'

test('reverseArray', () => {
  expect(reverseArray([1, 2, 3])).toEqual([3, 2, 1])
  expect(reverseArray([])).toEqual([])
  expect(reverseArray([1])).toEqual([1])
})
