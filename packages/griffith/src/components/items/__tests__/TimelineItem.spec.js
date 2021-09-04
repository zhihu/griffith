import React from 'react'
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
