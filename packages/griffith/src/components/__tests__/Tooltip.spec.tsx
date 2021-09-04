import React from 'react'
import {render} from 'enzyme'
import Tooltip from '../Tooltip'

describe('Tooltip', () => {
  it('get Tooltip component', () => {
    expect(render(<Tooltip content="高清" />)).toMatchSnapshot()
  })
})
