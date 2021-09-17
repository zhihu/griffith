import React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import Timeline from '../Timeline'

describe('Timeline', () => {
  it('get Timeline component', () => {
    const onSeek = jest.fn()
    const onChange = jest.fn()
    const onDragEnd = jest.fn()
    const onDragStart = jest.fn()
    const onProgressDotHover = jest.fn()
    const onProgressDotLeave = jest.fn()
    render(
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

    fireEvent.mouseDown(screen.getByRole('slider'))
    expect(onDragStart).toBeCalled()

    fireEvent.mouseUp(screen.getByRole('slider'), {clientX: 100})
    expect(onDragEnd).toBeCalled()
    expect(onChange).toBeCalled()

    // handle change
    onChange.mockClear()
    fireEvent.keyDown(screen.getByRole('slider'), {keyCode: 39})
    expect(onChange).toHaveBeenCalledWith(expect.any(Number))
    expect(onSeek).toBeCalled()
  })
})
