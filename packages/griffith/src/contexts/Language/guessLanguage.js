import SUPPORTED_LANGUAGES from './supportedLanguages'

const KEY_WORDS = [
  ['en', SUPPORTED_LANGUAGES.EN],
  ['ja', SUPPORTED_LANGUAGES.JA],

  ['hant', SUPPORTED_LANGUAGES.ZH_HANT],
  ['hans', SUPPORTED_LANGUAGES.ZH_HANS],

  ['hk', SUPPORTED_LANGUAGES.ZH_HANT],
  ['tw', SUPPORTED_LANGUAGES.ZH_HANT],

  ['cn', SUPPORTED_LANGUAGES.ZH_HANS],
  ['sg', SUPPORTED_LANGUAGES.ZH_HANS],

  ['zh', SUPPORTED_LANGUAGES.ZH_HANS], // prefer Simplified Chinese to Traditional if not specified
]

function matchKeyword(langCode) {
  const found = KEY_WORDS.find(([keyword]) => langCode.includes(keyword))
  return found ? found[1] : null
}

function guessLanguage(languageList) {
  const list = languageList.filter(Boolean).map(s => s.toLocaleLowerCase())
  for (let i = 0; i < list.length; i = i + 1) {
    const matchedSupportedLanguage = matchKeyword(list[i])
    if (matchedSupportedLanguage) {
      return matchedSupportedLanguage
    }
  }
  return SUPPORTED_LANGUAGES.EN
}

export default guessLanguage
