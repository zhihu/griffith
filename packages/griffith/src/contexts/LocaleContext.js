import React from 'react'
import locales, {defaultLocal} from '../constants/locales'

const LocaleContext = React.createContext(locales[defaultLocal])
LocaleContext.displayName = 'LocaleContext'

export default LocaleContext
