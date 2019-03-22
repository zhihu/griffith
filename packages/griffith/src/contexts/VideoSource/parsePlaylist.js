const QUALITY_ORDER = ['ld', 'sd', 'hd']

export const getQualities = (sources, isMobile) => {
  const qualities = Object.keys(sources).sort(
    (a, b) => QUALITY_ORDER.indexOf(a) - QUALITY_ORDER.indexOf(b)
  )

  if (qualities.length > 1) {
    if (isMobile) {
      // 移动端只返回最低清晰度
      return qualities.slice(0, 1)
    } else {
      // 桌面端端去掉低清，除非只有一个低清
      return qualities.filter(item => item !== 'ld')
    }
  }

  return qualities
}

export const getSources = (qualities, sources) =>
  qualities.map(quality => {
    const {play_url, ...rest} = sources[quality]
    return {
      ...rest,
      source: play_url,
      quality,
    }
  })
