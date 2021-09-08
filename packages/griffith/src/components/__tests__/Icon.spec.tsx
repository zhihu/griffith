import React from 'react'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import {render} from 'enzyme'
import Icon from '../Icon'
import * as icons from '../icons/controller'

describe('Icon', () => {
  it('get Icon component', () => {
    const wrapper = render(<Icon icon={icons.smallscreen} />)
    expect(wrapper).toMatchSnapshot()
  })
})
