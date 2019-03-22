import React from 'react'
import {shallow} from 'enzyme'
import Layer from '..'

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
