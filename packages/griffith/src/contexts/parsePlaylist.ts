import {Quality, FormattedPlaySource, PlaySourceMap} from '../types'
const QUALITY_ORDER: Quality[] = ['auto', 'ld', 'sd', 'hd', 'fhd']

export const getQualities = (
  sources: PlaySourceMap,
  isMobile: any,
  decQualities: boolean
) => {
  const qualities = (Object.keys(sources) as Quality[]).sort((a, b) =>
    decQualities
      ? QUALITY_ORDER.indexOf(b) - QUALITY_ORDER.indexOf(a)
      : QUALITY_ORDER.indexOf(a) - QUALITY_ORDER.indexOf(b)
  )

  if (qualities.length > 1) {
    if (isMobile) {
      // 移动端只返回最低清晰度
      return qualities.slice(0, 1)
    } else {
      // 桌面端端去掉低清，除非只有一个低清
      return qualities.filter((item) => item !== 'ld')
    }
  }

  return qualities
}

export const getSources = (
  qualities: Quality[],
  sources: PlaySourceMap
): FormattedPlaySource[] =>
  qualities.map((quality) => {
    // @ts-expect-error Property 'auto' does not exist on type 'PlaySourceMap'，应当是 QUALITY_ORDER 定义错了
    const {play_url, ...rest} = sources[quality]
    return {
      ...rest,
      source: play_url,
      quality,
    } as FormattedPlaySource
  })
