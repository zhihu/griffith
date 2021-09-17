import React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import Hover from '../Hover'

describe('Hover', () => {
  it('get Hover component', () => {
    const handleMouseEnter = jest.fn()
    const handleMouseLeave = jest.fn()
    let hovering = false
    const result = render(
      <Hover
        className="hover"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {(isHovered) => {
          hovering = isHovered
          return <button>{isHovered ? 'button' : 'input'}</button>
        }}
      </Hover>
    )
    expect(result.container).toMatchSnapshot()
    expect(hovering).toBeFalsy()

    // PointerEnter
    fireEvent.mouseEnter(screen.getByRole('button'))
    expect(handleMouseEnter).toBeCalled()
    expect(hovering).toBeTruthy()

    // PointerLeave
    fireEvent.mouseLeave(screen.getByRole('button'))
    expect(handleMouseLeave).toBeCalled()
    expect(hovering).toBeFalsy()
  })
})
