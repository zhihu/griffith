import React from 'react'
import Renderer from 'react-test-renderer'
import Tooltip from '../Tooltip'

describe('Tooltip', () => {
  it('get Tooltip component', () => {
    expect(
      Renderer.create(<Tooltip content="quality-hd" />).toJSON()
    ).toMatchSnapshot()
  })
})
