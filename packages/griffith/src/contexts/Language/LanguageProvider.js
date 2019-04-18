import React from 'react'
import PropTypes from 'prop-types'
import LanguageContext from './LanguageContext'
import guessLanguage from './guessLanguage'
import SUPPORTED_LANGUAGES from './supportedLanguages'

const VALID_LANGUAGES = Object.keys(SUPPORTED_LANGUAGES)

const isValid = language => VALID_LANGUAGES.includes(language)

function getLanguage(props) {
  const {language} = props
  if (isValid(language)) {
    return language
  } else if (typeof document !== 'undefined') {
    // detect language from html lang attributes and navigator.languages
    const htmlLanguage = document.documentElement.getAttribute('lang')
    const navigatorLanguages = navigator.languages || [navigator.language]
    const languageList = [htmlLanguage, ...navigatorLanguages]
    return guessLanguage(languageList)
  }

  return SUPPORTED_LANGUAGES.EN
}

export default class LanguageProvider extends React.PureComponent {
  static propTypes = {
    language: PropTypes.oneOf(VALID_LANGUAGES),
  }

  state = {
    language: SUPPORTED_LANGUAGES.EN,
  }

  static getDerivedStateFromProps = (props, state) => {
    const language = getLanguage(props)
    return language === state.language ? null : {language}
  }

  render() {
    return (
      <LanguageContext.Provider value={this.state.language}>
        {this.props.children}
      </LanguageContext.Provider>
    )
  }
}
