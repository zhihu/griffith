import {concatTypedArray, generateBox} from '../utils'
import mvhd from './mvhd'
import trak from './trak'
import mvex from './mvex'

export default function moov(data) {
  const content = concatTypedArray(
    mvhd(data),
    trak({...data, type: 'video'}),
    trak({...data, type: 'audio'}),
    mvex(data)
  )
  return generateBox('moov', content)
}
