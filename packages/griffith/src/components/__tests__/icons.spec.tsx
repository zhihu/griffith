import {isValidElement} from 'react'
import * as displayIcons from '../icons/display/index'
import * as controllerIcons from '../icons/controller/index'

test('icons', () => {
  expect(Object.values(displayIcons).some((x) => isValidElement(x))).toBe(true)
  expect(Object.values(controllerIcons).some((x) => isValidElement(x))).toBe(
    true
  )
})
