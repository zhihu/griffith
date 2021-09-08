import React from 'react'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import {render} from 'enzyme'
import Loader from '../Loader'

describe('Loader', () => {
  it('get Loader component', () => {
    const wrapper = render(<Loader />)
    expect(wrapper).toMatchSnapshot()
  })
})
