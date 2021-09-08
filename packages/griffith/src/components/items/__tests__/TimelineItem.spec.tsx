import React from 'react'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import {shallow} from 'enzyme'
import TimelineItem from '../TimelineItem'

describe('TimelineItem', () => {
  it('get TimelineItem component', () => {
    const wrapper = shallow(
      <TimelineItem
        value={7}
        total={187}
        buffered={12}
        onDragStart={jest.fn()}
        onDragEnd={jest.fn()}
        onChange={jest.fn()}
        onSeek={jest.fn()}
      />
    )
    expect(wrapper).toMatchSnapshot()
  })
})
