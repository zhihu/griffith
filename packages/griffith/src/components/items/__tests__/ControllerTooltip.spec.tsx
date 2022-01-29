import React from 'react'
import Renderer from 'react-test-renderer'
import ControllerTooltip from '../ControllerTooltip'

describe('Tooltip', () => {
  it('get Tooltip component', () => {
    expect(
      Renderer.create(
        <ControllerTooltip localeKey="quality-hd">
          <button />
        </ControllerTooltip>
      ).toJSON()
    ).toMatchSnapshot()
  })
})
