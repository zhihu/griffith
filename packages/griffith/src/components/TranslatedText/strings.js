import SUPPORTED_LANGUAGES from '../../contexts/Language/supportedLanguages'

export default {
  [SUPPORTED_LANGUAGES.EN]: {
    'quality-auto': 'Auto',
    'quality-ld': 'LD',
    'quality-sd': 'SD',
    'quality-hd': 'HD',
    'action-enter-fullscreen': 'Fullscreen',
    'action-exit-fullscreen': 'Exit Fullscreen',
  },
  [SUPPORTED_LANGUAGES.JA]: {
    'quality-auto': '自動',
    'quality-ld': '低画質',
    'quality-sd': '標準画質',
    'quality-hd': '高画質',
    'action-enter-fullscreen': '全画面',
    'action-exit-fullscreen': '全画面終了',
  },
  // covers zh-Hans-CN and zh-Hans-SG
  [SUPPORTED_LANGUAGES.ZH_HANS]: {
    'quality-auto': '自动',
    'quality-ld': '低清',
    'quality-sd': '标清',
    'quality-hd': '超清',
    'action-enter-fullscreen': '全屏',
    'action-exit-fullscreen': '退出全屏',
  },
  // covers zh-Hant-HK and zh-Hant-TW
  [SUPPORTED_LANGUAGES.ZH_HANT]: {
    'quality-auto': '自動',
    'quality-ld': '低畫質',
    'quality-sd': '標準畫質',
    'quality-hd': '高畫質',
    'action-enter-fullscreen': '全螢幕',
    'action-exit-fullscreen': '結束全螢幕',
  },
}
