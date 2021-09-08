import {getPerChunkArray} from '..'

describe('getPerChunkArray', () => {
  it('should get per chunk array', () => {
    const stscBox = {
      samples: [
        {
          firstChunk: 1,
          samplesPerChunk: 1,
        },
      ],
    }

    expect(getPerChunkArray(stscBox, 50)).toEqual([
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ])
  })

  it('shuold get per chunk array2', () => {
    const stscBox = {
      samples: [
        {
          firstChunk: 1,
          samplesPerChunk: 2,
        },
      ],
    }

    expect(getPerChunkArray(stscBox, 50)).toEqual([
      2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
      2,
    ])
  })

  it('shuold get per chunk array3', () => {
    const stscBox = {
      samples: [
        {
          firstChunk: 1,
          samplesPerChunk: 2,
        },
        {
          firstChunk: 2,
          samplesPerChunk: 2,
        },
        {
          firstChunk: 3,
          samplesPerChunk: 2,
        },
        {
          firstChunk: 5,
          samplesPerChunk: 2,
        },
        {
          firstChunk: 6,
          samplesPerChunk: 1,
        },
        {
          firstChunk: 8,
          samplesPerChunk: 2,
        },
        {
          firstChunk: 9,
          samplesPerChunk: 2,
        },
        {
          firstChunk: 11,
          samplesPerChunk: 2,
        },
      ],
    }

    expect(getPerChunkArray(stscBox, 30)).toEqual([
      2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    ])
  })
})
