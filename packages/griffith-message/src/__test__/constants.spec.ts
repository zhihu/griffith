import {EVENTS} from '../constants/events'
import {ACTIONS} from '../constants/actions'

test('exports actions and events', () => {
  const isString = (s: unknown) => typeof s === 'string'
  // 保持兼容
  expect(Object.values(EVENTS.DOM).every(isString)).toBe(true)
  expect(Object.values(EVENTS.PLAYER).every(isString)).toBe(true)
  expect(Object.values(ACTIONS.PLAYER).every(isString)).toBe(true)
  // 新引用
  expect([EVENTS.PLAY, ACTIONS.PLAY].every(isString)).toBe(true)
  expect(EVENTS.PLAY).not.toBe(ACTIONS.PLAY)
})
