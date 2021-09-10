import {concatTypedArray, generateBox} from '../utils'
import tkhd from './tkhd'
import mdia from './mdia'

export default function trak(data) {
  const content = concatTypedArray(tkhd(data), mdia(data))
  return generateBox('trak', content)
}
