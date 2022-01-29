import React, {ReactElement} from 'react'
import {useLocaleText} from '../contexts/LocaleContext'

const TranslatedText: React.FC<{
  name: Parameters<typeof useLocaleText>[0]
  /** narrow 简短的文本展示，text 正常文本展示，两种展示格式满足长短文案需求 */
  style?: Parameters<typeof useLocaleText>[1]
}> = ({name, style = 'text'}): ReactElement => {
  return <>{useLocaleText(name, style)}</>
}

export default TranslatedText
