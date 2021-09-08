import {concatTypedArray, generateBox} from '../utils'
import mvhd from './mvhd'
import trak from './trak'
import mvex from './mvex'

export default function moov(data: any, type: any) {
  const content = concatTypedArray(
    mvhd(data),
    trak({...data, type}),
    mvex(data)
  )
  return generateBox('moov', content)
}
