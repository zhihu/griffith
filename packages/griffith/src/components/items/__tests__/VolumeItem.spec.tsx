import React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import VolumeItem from '../VolumeItem'

describe('VolumeItem', () => {
  it('get VolumeItem component', () => {
    const handleMouseEnter = jest.fn()
    const handleMouseLeave = jest.fn()
    const result = render(
      <VolumeItem
        volume={0.9}
        menuShown={true}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onToggleMuted={jest.fn()}
        onDragStart={jest.fn()}
        onDragEnd={jest.fn()}
        onChange={jest.fn()}
      />
    )
    expect(result.container).toMatchSnapshot()

    // PointerEnter
    fireEvent.mouseEnter(screen.getByRole('button'))
    expect(handleMouseEnter).toBeCalled()

    // PointerLeave
    fireEvent.mouseLeave(screen.getByRole('button'))
    expect(handleMouseLeave).toBeCalled()
  })
})
