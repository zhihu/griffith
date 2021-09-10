import {getSamplesOffset} from '..'

describe('getSamplesOffset', () => {
  it('should get samples offset', () => {
    const stscBoxSamplesPerChunkArray = [
      1, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 1, 2, 2,
    ]

    const stszBox = {
      flags: 0,
      sampleSize: 0,
      samples: [
        {entrySize: 371},
        {entrySize: 372},
        {entrySize: 371},
        {entrySize: 372},
        {entrySize: 371},
        {entrySize: 544},
        {entrySize: 420},
        {entrySize: 419},
        {entrySize: 419},
        {entrySize: 383},
        {entrySize: 365},
        {entrySize: 363},
        {entrySize: 388},
        {entrySize: 370},
        {entrySize: 354},
        {entrySize: 382},
        {entrySize: 337},
        {entrySize: 425},
        {entrySize: 378},
        {entrySize: 358},
        {entrySize: 387},
        {entrySize: 346},
        {entrySize: 445},
        {entrySize: 372},
        {entrySize: 366},
      ],
    }

    expect(getSamplesOffset(stszBox, stscBoxSamplesPerChunkArray)).toEqual([
      371, 372, 371, 743, 371, 915, 420, 839, 419, 383, 748, 363, 751, 370, 724,
      382, 337, 762, 378, 736, 387, 346, 791, 372, 738,
    ])
  })

  it('should get samples offset2', () => {
    const stscBoxSamplesPerChunkArray = [46, 16]

    const stszBox = {
      samples: [
        {entrySize: 6},
        {entrySize: 6},
        {entrySize: 6},
        {entrySize: 6},
        {entrySize: 6},
        {entrySize: 6},
        {entrySize: 6},
        {entrySize: 6},
        {entrySize: 6},
        {entrySize: 6},
        {entrySize: 6},
        {entrySize: 6},
        {entrySize: 6},
        {entrySize: 6},
        {entrySize: 6},
        {entrySize: 6},
        {entrySize: 6},
        {entrySize: 6},
        {entrySize: 6},
        {entrySize: 6},
        {entrySize: 6},
        {entrySize: 6},
        {entrySize: 6},
        {entrySize: 6},
        {entrySize: 6},
        {entrySize: 6},
        {entrySize: 6},
        {entrySize: 6},
        {entrySize: 6},
        {entrySize: 6},
        {entrySize: 6},
        {entrySize: 6},
        {entrySize: 6},
        {entrySize: 6},
        {entrySize: 6},
        {entrySize: 6},
        {entrySize: 6},
        {entrySize: 6},
        {entrySize: 6},
        {entrySize: 6},
        {entrySize: 6},
        {entrySize: 6},
        {entrySize: 6},
        {entrySize: 6},
        {entrySize: 6},
        {entrySize: 6},
        {entrySize: 6},
        {entrySize: 35},
        {entrySize: 452},
        {entrySize: 328},
        {entrySize: 339},
        {entrySize: 341},
        {entrySize: 339},
        {entrySize: 376},
        {entrySize: 376},
        {entrySize: 365},
        {entrySize: 365},
        {entrySize: 371},
        {entrySize: 461},
        {entrySize: 460},
        {entrySize: 476},
        {entrySize: 465},
        {entrySize: 467},
      ],
    }

    expect(getSamplesOffset(stszBox, stscBoxSamplesPerChunkArray)).toEqual([
      6, 12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72, 78, 84, 90, 96, 102, 108,
      114, 120, 126, 132, 138, 144, 150, 156, 162, 168, 174, 180, 186, 192, 198,
      204, 210, 216, 222, 228, 234, 240, 246, 252, 258, 264, 270, 276, 6, 41,
      493, 821, 1160, 1501, 1840, 2216, 2592, 2957, 3322, 3693, 4154, 4614,
      5090, 5555,
    ])
  })
})
