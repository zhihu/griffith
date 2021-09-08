import {concatTypedArray, generateBox} from '../utils'
import vmhd from './vmhd'
import smhd from './smhd'
import dinf from './dinf'
import stbl from './stbl'

export default function minf(data) {
  const {type} = data
  let header = ''
  switch (type) {
    case 'video':
      header = vmhd()
      break
    case 'audio':
      header = smhd()
      break
  }
  const content = concatTypedArray(header, dinf(), stbl(data))
  return generateBox('minf', content)
}
