// 提供一个基础值，再推断出类型，让其他语言符合条件
const en = {
  'quality-auto': 'Auto',
  'quality-ld': 'LD',
  'quality-sd': 'SD',
  'quality-hd': 'HD',
  'quality-fhd': 'FHD',
  'action-enter-fullscreen': 'Fullscreen',
  'action-exit-fullscreen': 'Exit Fullscreen',
  'action-enter-page-fullscreen': 'PageFullscreen',
  'action-exit-page-fullscreen': 'Exit PageFullscreen',
  'action-enter-pip': 'Picture in Picture',
  'action-exit-pip': 'Exit Picture in Picture',
  'playback-rate': 'Speed',
  replay: 'Replay',
}

export type LocaleCode = 'en' | 'ja' | 'zh-Hans' | 'zh-Hant'
export type LocaleConfig = typeof en
export type LocaleConfigKey = keyof LocaleConfig
export type LocaleConfigMap = Record<LocaleCode, LocaleConfig>
export type PartialLocaleConfigMap = Partial<
  Record<LocaleCode, Partial<LocaleConfig>>
>

export const defaultLocale: LocaleCode = 'en'

// TODO: 应该提供 tree-shaking 的方式加载
const locales: LocaleConfigMap = {
  en,
  ja: {
    'quality-auto': '自動',
    'quality-ld': '低画質',
    'quality-sd': '標準画質',
    'quality-hd': '高画質',
    'quality-fhd': '超高画質',
    'action-enter-fullscreen': '全画面',
    'action-exit-fullscreen': '全画面終了',
    'action-enter-page-fullscreen': '全画面ページ',
    'action-exit-page-fullscreen': '全画面から撤退する',
    'action-enter-pip': 'ピクチャーインピクチャー',
    'action-exit-pip': 'ピクチャーインピクチャー終了',
    'playback-rate': '再生速度',
    replay: 'もう一回見る',
  },
  // covers zh-Hans-CN and zh-Hans-SG
  'zh-Hans': {
    'quality-auto': '自动',
    'quality-ld': '低清',
    'quality-sd': '标清',
    'quality-hd': '高清',
    'quality-fhd': '超清',
    'action-enter-fullscreen': '全屏',
    'action-exit-fullscreen': '退出全屏',
    'action-enter-page-fullscreen': '网页全屏',
    'action-exit-page-fullscreen': '退出网页全屏',
    'action-enter-pip': '画中画',
    'action-exit-pip': '退出画中画',
    'playback-rate': '倍速',
    replay: '重新播放',
  },
  // covers zh-Hant-HK and zh-Hant-TW
  'zh-Hant': {
    'quality-auto': '自動',
    'quality-ld': '低畫質',
    'quality-sd': '標準畫質',
    'quality-hd': '高畫質',
    'quality-fhd': '超高畫質',
    'action-enter-fullscreen': '全螢幕',
    'action-exit-fullscreen': '結束全螢幕',
    'action-enter-page-fullscreen': '網頁全屏',
    'action-exit-page-fullscreen': '退出網頁全屏',
    'action-enter-pip': '子母畫面',
    'action-exit-pip': '關閉子母畫面',
    'playback-rate': '倍速',
    replay: '重新播放',
  },
}

export default locales
