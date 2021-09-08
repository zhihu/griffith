import {getDuration} from '..'

describe('getDuration', () => {
  it('should get video duration from stts box1', () => {
    const sttsBox1 = {
      samples: [
        {
          sampleCount: 5,
          sampleDelta: 1024,
        },
      ],
    }

    expect(getDuration(sttsBox1, 5)).toBe(1024 * 5)
  })

  it('should get video duration from stts box2', () => {
    const sttsBox2 = {
      samples: [
        {
          sampleCount: 5,
          sampleDelta: 1024,
        },
        {
          sampleCount: 2,
          sampleDelta: 512,
        },
      ],
    }

    expect(getDuration(sttsBox2, 7)).toBe(5 * 1024 + 2 * 512)
  })
})
