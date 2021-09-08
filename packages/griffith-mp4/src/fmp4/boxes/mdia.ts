import {concatTypedArray, generateBox} from '../utils'
import mdhd from './mdhd'
import hdlr from './hdlr'
import minf from './minf'

export default function mdia(data: any) {
  const content = concatTypedArray(mdhd(data), hdlr(data.type), minf(data))
  return generateBox('mdia', content)
}
