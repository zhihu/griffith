import {concatTypedArray, generateBox} from '../utils'
import mfhd from './mfhd'
import traf from './traf'

export default function moof(data: any) {
  const content = concatTypedArray(mfhd(data), traf(data))
  return generateBox('moof', content)
}
