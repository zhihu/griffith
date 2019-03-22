export default function createMasterM3U8(list) {
  const result = []
  result.push('#EXTM3U')

  list.forEach(item => {
    const meta = {
      'PROGRAM-ID': '1',
      BANDWIDTH: String(item.bandwidth),
    }
    if (item.resolution) {
      const {width, height} = item.resolution
      meta.RESOLUTION = `${width}x${height}`
    }
    result.push(
      `#EXT-X-STREAM-INF:${Object.entries(meta)
        .map(([key, value]) => `${key}=${value}`)
        .join(',')}`
    )

    result.push(item.source)
  })

  return result.join('\n')
}
