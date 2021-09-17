import React from 'react'
import Renderer from 'react-test-renderer'
import Loader from '../Loader'

describe('Loader', () => {
  it('get Loader component', () => {
    expect(Renderer.create(<Loader />).toJSON()).toMatchSnapshot()
  })
})
