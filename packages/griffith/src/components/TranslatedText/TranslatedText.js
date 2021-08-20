import React from 'react'
import {LocaleContext} from '../../contexts/Locale'

const TranslatedText = ({name}) => {
  return (
    <LocaleContext.Consumer>
      {locale => {
        return locale[name]
      }}
    </LocaleContext.Consumer>
  )
}

export default TranslatedText
