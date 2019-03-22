import createMasterM3U8 from '../createMasterM3U8'

describe('create master m3u8', () => {
  it('list with resolution', () => {
    const list = [
      {
        bandwidth: 1029120,
        resolution: {
          height: 478,
          width: 848,
        },
        source:
          'http://zhihu-video-output.oss-cn-hangzhou.aliyuncs.com/test/sd-m3u8/999f95fc-0346-11e9-b494-0a580a44d740.m3u8',
      },
      {
        bandwidth: 2463744,
        resolution: {
          height: 720,
          width: 1280,
        },
        source:
          'http://zhihu-video-output.oss-cn-hangzhou.aliyuncs.com/test/hd-m3u8/999f95fc-0346-11e9-b494-0a580a44d740.m3u8',
      },
    ]

    expect(createMasterM3U8(list)).toMatchSnapshot()
  })

  it('palylist wihtout resolution', () => {
    const list = [
      {
        bandwidth: 1029120,
        source:
          'http://zhihu-video-output.oss-cn-hangzhou.aliyuncs.com/test/sd-m3u8/999f95fc-0346-11e9-b494-0a580a44d740.m3u8',
      },
      {
        bandwidth: 2463744,
        source:
          'http://zhihu-video-output.oss-cn-hangzhou.aliyuncs.com/test/hd-m3u8/999f95fc-0346-11e9-b494-0a580a44d740.m3u8',
      },
    ]
    expect(createMasterM3U8(list)).toMatchSnapshot()
  })
})
