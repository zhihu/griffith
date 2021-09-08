import {concatTypedArray, generateBox} from '../utils'
import tfhd from './tfhd'
import sdtp from './sdtp'
import tfdt from './tfdt'
import trun from './trun'

export default function traf(data) {
  const content = concatTypedArray(
    tfhd(data),
    tfdt(data),
    sdtp(data),
    trun(data)
  )
  return generateBox('traf', content)
}
