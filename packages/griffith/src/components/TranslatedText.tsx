import React, {ReactElement} from 'react'
import {LocaleConfig, LocaleConfigKey} from '../constants/locales'
import LocaleContext from '../contexts/LocaleContext'

const TranslatedText: React.FC<{
  name: LocaleConfigKey
  style?: 'narrow' | 'text' // narrow 简短的文本展示，text 正常文本展示，两种展示格式满足长短文案需求
}> = ({name, style = 'text'}): ReactElement => {
  return (
    <LocaleContext.Consumer>
      {(locale) => {
        if (typeof locale[name] === 'object')
          return (
            locale[name] as Exclude<LocaleConfig[keyof LocaleConfig], string>
          )[style]
        return locale[name]
      }}
    </LocaleContext.Consumer>
  )
}

export default TranslatedText
