import React, {useContext} from 'react'
import locales, {defaultLocale} from '../constants/locales'
import type {LocaleConfig, LocaleConfigKey} from '../constants/locales'

const LocaleContext = React.createContext(locales[defaultLocale])
LocaleContext.displayName = 'LocaleContext'

/** Get i18n locale text */
export const useLocaleText = (
  name: LocaleConfigKey,
  style: 'narrow' | 'text' = 'text'
): string => {
  const locale = useContext(LocaleContext)
  if (typeof locale[name] === 'object') {
    const value = locale[name] as Exclude<
      LocaleConfig[keyof LocaleConfig],
      string
    >
    return value[style]
  }
  return locale[name] as string
}

export default LocaleContext
