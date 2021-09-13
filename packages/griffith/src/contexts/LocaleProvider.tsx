import React, {useMemo} from 'react'
import LocaleContext from './LocaleContext'
import locales, {LocaleCode, PartialLocaleConfigMap} from '../constants/locales'

const getLocalConfig = (
  locale: LocaleCode,
  userLocals?: PartialLocaleConfigMap
) => {
  const defaultConfig = locales[locale]
  const userConfig = userLocals?.[locale]
  return userConfig
    ? Object.assign({}, defaultConfig, userConfig)
    : defaultConfig
}

type Props = {
  locale: LocaleCode
  localeConfig?: PartialLocaleConfigMap
  children: React.ReactNode
}

const LocaleProvider: React.FC<Props> = ({locale, localeConfig, children}) => {
  const value = useMemo(
    () => getLocalConfig(locale, localeConfig),
    [locale, localeConfig]
  )
  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  )
}

export default LocaleProvider
