import React from 'react'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import {render} from 'enzyme'
import Tooltip from '../Tooltip'

describe('Tooltip', () => {
  it('get Tooltip component', () => {
    expect(render(<Tooltip content="高清" />)).toMatchSnapshot()
  })
})
