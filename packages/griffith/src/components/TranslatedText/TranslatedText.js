import React from 'react'
import {LanguageContext} from '../../contexts/Language'
import strings from './strings'

const TranslatedText = ({name}) => (
  <LanguageContext.Consumer>
    {locale => strings[locale][name]}
  </LanguageContext.Consumer>
)

export default TranslatedText
