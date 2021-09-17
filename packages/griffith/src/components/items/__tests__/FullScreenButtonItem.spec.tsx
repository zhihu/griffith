import React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import FullScreenButtonItem from '../FullScreenButtonItem'

describe('FullScreenButtonItem', () => {
  it('get FullScreenButtonItem component', () => {
    const onClick = jest.fn()
    const result = render(
      <FullScreenButtonItem isFullScreen={true} onClick={onClick} />
    )
    expect(result.container).toMatchSnapshot()
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toBeCalled()
  })
})
