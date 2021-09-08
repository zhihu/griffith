import React from 'react'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import {shallow} from 'enzyme'
import Hover from '../Hover'

describe('Hover', () => {
  it('get Hover component', () => {
    const handleMouseEnter = jest.fn()
    const handlemouseLeave = jest.fn()
    const wrapper = shallow(
      <Hover
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        className="hover"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handlemouseLeave}
      >
        {(isHovered: any) => <button>{isHovered ? 'button' : 'input'}</button>}
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
