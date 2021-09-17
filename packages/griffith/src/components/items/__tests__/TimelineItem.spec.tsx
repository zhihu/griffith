import React from 'react'
import {render} from '@testing-library/react'
import TimelineItem from '../TimelineItem'

describe('TimelineItem', () => {
  it('get TimelineItem component', () => {
    const result = render(
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
    expect(result.container).toMatchSnapshot()
  })
})
