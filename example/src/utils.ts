/* eslint-disable no-console */

import throttle from 'lodash/throttle'
import {EVENTS} from 'griffith'

const createGroupedLogger = (label = 'Log', wait = 100) => {
  const logs: any[] = []
  const flush = throttle(() => {
    console.groupCollapsed?.(`[Click to expand]: ${label}, ${logs.length} logs`)
    let log
    while ((log = logs.shift())) {
      console.info(...log)
    }
    console.groupEnd?.()
  }, wait)
  return (...args: any[]) => {
    logs.push(args)
    flush()
  }
}

const groupedLogger = createGroupedLogger('TIMEUPDATE', 2000)

export const logEvent = (e: string, data: any) => {
  const args = ['onEvent', e, data]
  if (e === EVENTS.DOM.TIMEUPDATE) {
    groupedLogger(...args)
  } else {
    console.log(...args)
  }
}
