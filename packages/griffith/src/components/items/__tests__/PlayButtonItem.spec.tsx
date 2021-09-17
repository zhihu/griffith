import React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import PlayButtonItem from '../PlayButtonItem'

describe('PlayButtonItem', () => {
  it('get PlayButtonItem component', () => {
    const onClick = jest.fn()
    const result = render(<PlayButtonItem isPlaying={true} onClick={onClick} />)
    expect(result.container).toMatchSnapshot()
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toBeCalled()
  })
})
