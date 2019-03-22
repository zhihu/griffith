import React from 'react'
import {render} from 'enzyme'
import Tooltip from '..'

describe('Tooltip', () => {
  it('get Tooltip component', () => {
    expect(render(<Tooltip content="高清" />)).toMatchSnapshot()
  })
})
