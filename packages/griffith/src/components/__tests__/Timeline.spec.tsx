import React from 'react'
import {shallow} from 'enzyme'
import Timeline from '../Timeline'

describe('Timeline', () => {
  it('get Timeline component', () => {
    const onSeek = jest.fn()
    const onChange = jest.fn()
    const onDragEnd = jest.fn()
    const onDragStart = jest.fn()
    const onProgressDotHover = jest.fn()
    const onProgressDotLeave = jest.fn()
    const wrapper = shallow(
      <Timeline
        buffered={7}
        total={182.234}
        value={0.453}
        onChange={onChange}
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        onSeek={onSeek}
        onProgressDotHover={onProgressDotHover}
        onProgressDotLeave={onProgressDotLeave}
      />
    )

    expect(wrapper).toMatchSnapshot()

    expect(wrapper.state().progressDotHovered).toBeFalsy()

    expect(wrapper.state().isHovered).toBeFalsy()

    // PointerEnter
    wrapper.simulate('mouseenter')
    expect(wrapper.state().isHovered).toBeTruthy()

    // PointerLeave
    wrapper.simulate('mouseleave')
    expect(wrapper.state().isHovered).toBeFalsy()

    expect(wrapper.state().isFocused).toBeFalsy()
    // focus event
    wrapper.find('Slider').simulate('focus')
    expect(wrapper.state().isFocused).toBeTruthy()

    // blur event
    wrapper.find('Slider').simulate('blur')
    expect(wrapper.state().isFocused).toBeFalsy()

    expect(wrapper.state().isDragging).toBeFalsy()
    // focus event
    wrapper.find('Slider').simulate('dragstart')
    expect(wrapper.state().isDragging).toBeTruthy()
    expect(onDragStart).toBeCalled()

    // blur event
    wrapper.find('Slider').simulate('dragend')
    expect(wrapper.state().isDragging).toBeFalsy()
    expect(onDragEnd).toBeCalled()

    // handle change
    wrapper.instance().handleChange(47)
    expect(onChange).toBeCalled()
    expect(onSeek).toBeCalled()
  })
})
