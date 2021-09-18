import React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import ControllerButton from '../ControllerButton'

describe('ControllerButton', () => {
  it('get ControllerButton component', () => {
    const onSubmit = jest.fn()
    const onClick = jest.fn()
    render(
      <form onSubmit={onSubmit}>
        <ControllerButton onClick={onClick} />
      </form>
    )
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toBeCalled()
    expect(onSubmit).not.toBeCalled()
  })
})
