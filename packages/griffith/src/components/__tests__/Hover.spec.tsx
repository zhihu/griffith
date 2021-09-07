import React from 'react'
import {shallow} from 'enzyme'
import Hover from '../Hover'

describe('Hover', () => {
  it('get Hover component', () => {
    const handleMouseEnter = jest.fn()
    const handlemouseLeave = jest.fn()
    const wrapper = shallow(
      <Hover
        className="hover"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handlemouseLeave}
      >
        {(isHovered) => <button>{isHovered ? 'button' : 'input'}</button>}
      </Hover>
    )
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.state().isHovered).toBeFalsy()

    // PointerEnter
    wrapper.simulate('mouseenter')
    expect(wrapper.state().isHovered).toBeTruthy()
    expect(handleMouseEnter).toBeCalled()

    // PointerLeave
    wrapper.simulate('mouseleave')
    expect(wrapper.state().isHovered).toBeFalsy()
    expect(handlemouseLeave).toBeCalled()
  })
})
