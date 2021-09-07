import * as EVENTS from '../constants/events'
import * as ACTIONS from '../constants/actions'

test('exports actions and events', () => {
  const isString = (s: any) => typeof s === 'string'
  expect(Object.values(EVENTS.DOM).every(isString)).toBe(true)
  expect(Object.values(EVENTS.PLAYER).every(isString)).toBe(true)
  expect(Object.values(ACTIONS.PLAYER).every(isString)).toBe(true)
})
