import {concatTypedArray, generateBox} from '../utils'
import vmhd from './vmhd'
import smhd from './smhd'
import dinf from './dinf'
import stbl from './stbl'

export default function minf(data: any) {
  const {type} = data
  let header = ''
  switch (type) {
    case 'video':
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'Uint8Array' is not assignable to type 'strin... Remove this comment to see the full error message
      header = vmhd()
      break
    case 'audio':
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'Uint8Array' is not assignable to type 'strin... Remove this comment to see the full error message
      header = smhd()
      break
  }
  const content = concatTypedArray(header, dinf(), stbl(data))
  return generateBox('minf', content)
}
