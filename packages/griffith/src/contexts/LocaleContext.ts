import React from 'react'
import locales, {defaultLocale} from '../constants/locales'

const LocaleContext = React.createContext(locales[defaultLocale])
LocaleContext.displayName = 'LocaleContext'

export default LocaleContext
