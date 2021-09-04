import React from 'react'
import {render} from 'enzyme'
import Icon from '../Icon'
import * as icons from '../icons/controller'

describe('Icon', () => {
  it('get Icon component', () => {
    const wrapper = render(<Icon icon={icons.smallscreen} />)
    expect(wrapper).toMatchSnapshot()
  })
})
