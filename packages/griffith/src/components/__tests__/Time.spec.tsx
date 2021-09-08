import React from 'react'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import {render} from 'enzyme'
import Time from '../Time'

describe('Time', () => {
  it('get Time component', () => {
    expect(render(<Time value={904} />)).toMatchSnapshot()
    expect(render(<Time />)).toMatchSnapshot()
  })
})
