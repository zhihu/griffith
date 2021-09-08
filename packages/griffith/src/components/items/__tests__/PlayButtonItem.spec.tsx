import React from 'react'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
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
