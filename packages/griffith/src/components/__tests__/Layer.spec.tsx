import React from 'react'
import {render} from '@testing-library/react'
import ObjectFitProvider from '../../contexts/ObjectFitProvider'
import Layer from '../Layer'

describe('Layer', () => {
  it('get Layer component', () => {
    const result1 = render(<Layer />)
    expect(result1.container.innerHTML).toMatchSnapshot()

    const result2 = render(
      <ObjectFitProvider initialObjectFit="cover">
        <Layer>
          <span>123</span>
        </Layer>
      </ObjectFitProvider>
    )
    expect(result2.container.innerHTML).toMatchSnapshot()
  })
})
