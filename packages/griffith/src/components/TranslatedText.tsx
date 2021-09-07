import React from 'react'
import {LocaleConfigKey} from '../constants/locales'
import LocaleContext from '../contexts/LocaleContext'

const TranslatedText = ({name}: {name: LocaleConfigKey}) => {
  return (
    <LocaleContext.Consumer>
      {(locale) => {
        return locale[name]
      }}
    </LocaleContext.Consumer>
  )
}

export default TranslatedText
