type Item = {
  bandwidth: number
  resolution: {
    height: number
    width: number
  }
  source: string
}

export default function createMasterM3U8(list: Item[]) {
  const result = []
  result.push('#EXTM3U')

  list.forEach((item) => {
    const meta: Record<string, unknown> = {
      'PROGRAM-ID': '1',
      BANDWIDTH: String(item.bandwidth),
    }
    if (item.resolution) {
      const {width, height} = item.resolution
      meta.RESOLUTION = `${width}x${height}`
    }
    result.push(
      `#EXT-X-STREAM-INF:${Object.entries(meta)
        .map(([key, value]) => `${key}=${value as string}`)
        .join(',')}`
    )

    result.push(item.source)
  })

  return result.join('\n')
}
