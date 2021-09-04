import React from 'react'
import LocaleContext from '../../contexts/LocaleContext'

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
