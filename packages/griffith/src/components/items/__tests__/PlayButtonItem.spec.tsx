import React from 'react'
import {shallow} from 'enzyme'
import PlayButtonItem from '../PlayButtonItem'

describe('PlayButtonItem', () => {
  it('get PlayButtonItem component', () => {
    const onClick = jest.fn()
    const wrapper = shallow(
      <PlayButtonItem isPlaying={true} onClick={onClick} />
    )
    expect(wrapper).toMatchSnapshot()
    wrapper.find('button').simulate('click')
    expect(onClick).toBeCalled()
  })
})
