import React from 'react'
import {LocaleContext} from '../../contexts/Locale'
import strings from './strings'

const TranslatedText = ({name}) => (
  <LocaleContext.Consumer>
    {locale => strings[locale][name]}
  </LocaleContext.Consumer>
)

export default TranslatedText
