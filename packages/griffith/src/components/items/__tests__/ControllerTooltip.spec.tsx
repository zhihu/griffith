import React from 'react'
import Renderer from 'react-test-renderer'
import ControllerTooltip from '../ControllerTooltip'

describe('Tooltip', () => {
  it('get Tooltip component', () => {
    expect(
      Renderer.create(<ControllerTooltip content="quality-hd" />).toJSON()
    ).toMatchSnapshot()
  })
})
