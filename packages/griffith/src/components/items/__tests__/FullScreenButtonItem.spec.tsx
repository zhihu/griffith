import React from 'react'
import {mount} from 'enzyme'
import FullScreenButtonItem from '../FullScreenButtonItem'

describe('FullScreenButtonItem', () => {
  it('get FullScreenButtonItem component', () => {
    const onClick = jest.fn()
    const wrapper = mount(
      <FullScreenButtonItem isFullScreen={true} onClick={onClick} />
    )
    expect(wrapper).toMatchSnapshot()
    wrapper.find('button').simulate('click')
    expect(onClick).toBeCalled()
  })
})
