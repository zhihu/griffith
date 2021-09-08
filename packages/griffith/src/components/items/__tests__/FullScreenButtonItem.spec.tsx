import React from 'react'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
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
