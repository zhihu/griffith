import React, {useMemo} from 'react'
import LocaleContext from './LocaleContext'
import locales from '../constants/locales'

const getLocalConfig = (locale, userLocals) => {
  const defaultConfig = locales[locale]
  const userConfig = userLocals[locale]
  return userConfig
    ? Object.assign({}, defaultConfig, userConfig)
    : defaultConfig
}

export default function LocaleProvider({locale, localeConfig, children}) {
  const value = useMemo(() => getLocalConfig(locale, localeConfig), [
    locale,
    localeConfig,
  ])
  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  )
}
