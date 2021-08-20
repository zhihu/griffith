import React from 'react'
import LocaleContext from './LocaleContext'
import strings from '../../components/TranslatedText/strings'
const mergeLocal = (locale, strings, option) => {
  const defaultString = strings[locale]
  const optionString = option[locale]
  if (!optionString) return defaultString
  return Object.assign({}, defaultString, optionString)
}

export default class LocaleProvider extends React.PureComponent {
  state = {
    value: mergeLocal(this.props.locale, strings, this.props.localeConfig),
  }
  render() {
    return (
      <LocaleContext.Provider value={this.state.value}>
        {this.props.children}
      </LocaleContext.Provider>
    )
  }
}
