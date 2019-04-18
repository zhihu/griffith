import guessLanguage from './guessLanguage'
import SUPPORTED_LANGUAGES from './supportedLanguages'

describe('guessLanguage', () => {
  it('should return first suppored language in the list', () => {
    expect(guessLanguage(['zh-tw', 'en'])).toBe(SUPPORTED_LANGUAGES.ZH_HANT)
    expect(guessLanguage(['fr', 'en'])).toBe(SUPPORTED_LANGUAGES.EN)
  })

  it('should return default language if no match found', () => {
    expect(guessLanguage(['es', 'de'])).toBe(SUPPORTED_LANGUAGES.EN)
  })

  it('should return default language if provided empty list', () => {
    expect(guessLanguage([])).toBe(SUPPORTED_LANGUAGES.EN)
  })

  it('handle various Chinese language codes', () => {
    expect(guessLanguage(['zh-CN'])).toBe(SUPPORTED_LANGUAGES.ZH_HANS)
    expect(guessLanguage(['zh-SG'])).toBe(SUPPORTED_LANGUAGES.ZH_HANS)

    expect(guessLanguage(['zh-TW'])).toBe(SUPPORTED_LANGUAGES.ZH_HANT)
    expect(guessLanguage(['zh-HK'])).toBe(SUPPORTED_LANGUAGES.ZH_HANT)

    expect(guessLanguage(['zh-cmn-Hans'])).toBe(SUPPORTED_LANGUAGES.ZH_HANS)
    expect(guessLanguage(['cmn-Hans-CN'])).toBe(SUPPORTED_LANGUAGES.ZH_HANS)
    expect(guessLanguage(['zh-cmn-Hans-HK'])).toBe(SUPPORTED_LANGUAGES.ZH_HANS)

    expect(guessLanguage(['zh-cmn-Hant'])).toBe(SUPPORTED_LANGUAGES.ZH_HANT)
    expect(guessLanguage(['zh-cmn-Hant'])).toBe(SUPPORTED_LANGUAGES.ZH_HANT)
    expect(guessLanguage(['zh-cmn-Hant-CN'])).toBe(SUPPORTED_LANGUAGES.ZH_HANT)
  })

  it('prefer Simplified Chinese to Traditional if not specified', () => {
    expect(guessLanguage(['zh'])).toBe(SUPPORTED_LANGUAGES.ZH_HANS)
  })
})
