import React from 'react'
import {render} from 'enzyme'
import Time from '../Time'

describe('Time', () => {
  it('get Time component', () => {
    expect(render(<Time value={904} />)).toMatchSnapshot()
    expect(render(<Time />)).toMatchSnapshot()
  })
})
