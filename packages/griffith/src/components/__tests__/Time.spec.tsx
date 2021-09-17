import React from 'react'
import Renderer from 'react-test-renderer'
import Time from '../Time'

describe('Time', () => {
  it('get Time component', () => {
    expect(Renderer.create(<Time value={904} />).toJSON()).toMatchSnapshot()
    expect(Renderer.create(<Time />).toJSON()).toMatchSnapshot()
  })
})
