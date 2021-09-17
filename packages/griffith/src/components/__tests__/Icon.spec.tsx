import React from 'react'
import Renderer from 'react-test-renderer'
import Icon from '../Icon'
import * as icons from '../icons/controller'

describe('Icon', () => {
  it('get Icon component', () => {
    expect(
      Renderer.create(<Icon icon={icons.smallscreen} />).toJSON()
    ).toMatchSnapshot()
  })
})
