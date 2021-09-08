import React from 'react'
import LocaleContext from '../contexts/LocaleContext'

const TranslatedText = ({name}: any) => {
  return (
    <LocaleContext.Consumer>
      {(locale) => {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        return locale[name]
      }}
    </LocaleContext.Consumer>
  )
}

export default TranslatedText
