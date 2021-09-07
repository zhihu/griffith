import React, {useMemo} from 'react'
import LocaleContext from './LocaleContext'
import locales, {LocaleCode, PartialLocaleConfigMap} from '../constants/locales'

const getLocalConfig = (
  locale: LocaleCode,
  userLocals: PartialLocaleConfigMap
) => {
  const defaultConfig = locales[locale]
  const userConfig = userLocals[locale]
  return userConfig
    ? Object.assign({}, defaultConfig, userConfig)
    : defaultConfig
}

type Props = {
  locale: LocaleCode
  localeConfig: PartialLocaleConfigMap
  children: React.ReactNode
}

export default function LocaleProvider({
  locale,
  localeConfig,
  children,
}: Props) {
  const value = useMemo(
    () => getLocalConfig(locale, localeConfig),
    [locale, localeConfig]
  )
  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  )
}
