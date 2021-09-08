import React from 'react'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import {shallow} from 'enzyme'
import Layer from '../Layer'

describe('Layer', () => {
  it('get Layer component', () => {
    const wrapper1 = shallow(<Layer />)
    expect(wrapper1).toEqual({})

    const wrapper2 = shallow(
      <Layer>
        <span>123</span>
      </Layer>
    )
    expect(wrapper2).toMatchSnapshot()
  })
})
