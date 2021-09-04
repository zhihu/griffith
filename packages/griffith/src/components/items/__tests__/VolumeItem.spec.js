import React from 'react'
import {shallow} from 'enzyme'
import VolumeItem from '../VolumeItem'

describe('VolumeItem', () => {
  it('get VolumeItem component', () => {
    const handleMouseEnter = jest.fn()
    const handlemouseLeave = jest.fn()
    const wrapper = shallow(
      <VolumeItem
        volume={0.9}
        menuShown={true}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handlemouseLeave}
        onToggleMuted={jest.fn()}
        onDragStart={jest.fn()}
        onDragEnd={jest.fn()}
        onChange={jest.fn()}
      />
    )
    expect(wrapper).toMatchSnapshot()

    // PointerEnter
    wrapper.simulate('mouseenter')
    expect(handleMouseEnter).toBeCalled()

    // PointerLeave
    wrapper.simulate('mouseleave')
    expect(handlemouseLeave).toBeCalled()
  })
})
