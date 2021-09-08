import React, {useMemo} from 'react'
import LocaleContext from './LocaleContext'
import locales from '../constants/locales'

const getLocalConfig = (locale: any, userLocals: any) => {
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const defaultConfig = locales[locale]
  const userConfig = userLocals[locale]
  return userConfig
    ? Object.assign({}, defaultConfig, userConfig)
    : defaultConfig
}

export default function LocaleProvider({locale, localeConfig, children}: any) {
  const value = useMemo(
    () => getLocalConfig(locale, localeConfig),
    [locale, localeConfig]
  )
  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  )
}
