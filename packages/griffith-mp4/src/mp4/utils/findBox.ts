import {Mp4BoxTree} from '../types'

const fnMap = {
  moov: findMoovBox,
  mvhd: findMvhdBox,
  videoTrak: findVideoTrakBox,
  audioTrak: findAudioTrakBox,
  videoTkhd: findVideoTkhdBox,
  audioTkhd: findAudioTkhdBox,
  videoStbl: findVideoStblBox,
  audioStbl: findAudioStblBox,
  videoStsc: findVideoStscBox,
  audioStsc: findAudioStscBox,
  avcC: findAvcCBox,
  esds: findEsdsBox,
  videoStco: findVideoStcoBox,
  audioStco: findAudioStcoBox,
  videoStts: findVideoSttsBox,
  audioStts: findAudioSttsBox,
  audioMdhd: findAudioMdhdBox,
  videoMdhd: findVideoMdhdBox,
  videoStss: findVideoStssBox,
  videoStsz: findVideoStszBox,
  videoCtts: findVideoCttsBox,
  audioStsz: findAudioStszBox,
  mp4a: findMp4aBox,
  audioElst: findAudioElstBox,
  videoElst: findVideoElstBox,
}

export type TypeBoxMap = typeof fnMap

export default function findBox<T extends keyof TypeBoxMap>(
  mp4BoxTree: Mp4BoxTree,
  type: T
) {
  const fn = fnMap[type]
  return (fn ? fn(mp4BoxTree) : {}) as ReturnType<TypeBoxMap[T]>
}

function findMoovBox(mp4BoxTree: Mp4BoxTree) {
  return mp4BoxTree['moov']
}

function findMvhdBox(mp4BoxTree: Mp4BoxTree) {
  return findMoovBox(mp4BoxTree)['mvhd']
}

function findVideoTrakBox(mp4BoxTree: Mp4BoxTree) {
  return findMoovBox(mp4BoxTree)['videoTrak']
}

function findVideoTkhdBox(mp4BoxTree: Mp4BoxTree) {
  return findVideoTrakBox(mp4BoxTree)['tkhd']
}

function findVideoStblBox(mp4BoxTree: Mp4BoxTree) {
  return findVideoTrakBox(mp4BoxTree)['mdia']['minf']['stbl']
}

function findAudioTrakBox(mp4BoxTree: Mp4BoxTree) {
  return findMoovBox(mp4BoxTree)['audioTrak']
}

function findAudioStblBox(mp4BoxTree: Mp4BoxTree) {
  return findAudioTrakBox(mp4BoxTree)['mdia']['minf']['stbl']
}

function findAudioTkhdBox(mp4BoxTree: Mp4BoxTree) {
  return findAudioTrakBox(mp4BoxTree)['tkhd']
}

function findVideoStscBox(mp4BoxTree: Mp4BoxTree) {
  return findVideoStblBox(mp4BoxTree)['stsc']
}

function findAudioStscBox(mp4BoxTree: Mp4BoxTree) {
  return findAudioStblBox(mp4BoxTree)['stsc']
}

function findAvcCBox(mp4BoxTree: Mp4BoxTree) {
  return findVideoStblBox(mp4BoxTree)['stsd']['avc1'][0]['avcC']
}

function findMp4aBox(mp4BoxTree: Mp4BoxTree) {
  return findAudioStblBox(mp4BoxTree)['stsd']['mp4a'][0]
}

function findEsdsBox(mp4BoxTree: Mp4BoxTree) {
  return findMp4aBox(mp4BoxTree)['esds']
}

function findVideoStcoBox(mp4BoxTree: Mp4BoxTree) {
  return findVideoStblBox(mp4BoxTree)['stco']
}

function findAudioStcoBox(mp4BoxTree: Mp4BoxTree) {
  return findAudioStblBox(mp4BoxTree)['stco']
}

function findVideoSttsBox(mp4BoxTree: Mp4BoxTree) {
  return findVideoStblBox(mp4BoxTree)['stts']
}

function findAudioSttsBox(mp4BoxTree: Mp4BoxTree) {
  return findAudioStblBox(mp4BoxTree)['stts']
}

function findVideoMdhdBox(mp4BoxTree: Mp4BoxTree) {
  return findVideoTrakBox(mp4BoxTree)['mdia']['mdhd']
}

function findAudioMdhdBox(mp4BoxTree: Mp4BoxTree) {
  return findAudioTrakBox(mp4BoxTree)['mdia']['mdhd']
}

function findVideoStssBox(mp4BoxTree: Mp4BoxTree) {
  return findVideoStblBox(mp4BoxTree)['stss']
}

function findVideoStszBox(mp4BoxTree: Mp4BoxTree) {
  return findVideoStblBox(mp4BoxTree)['stsz']
}

function findAudioStszBox(mp4BoxTree: Mp4BoxTree) {
  return findAudioStblBox(mp4BoxTree)['stsz']
}

function findVideoCttsBox(mp4BoxTree: Mp4BoxTree) {
  return findVideoStblBox(mp4BoxTree)['ctts']
}

function findAudioElstBox(mp4BoxTree: Mp4BoxTree) {
  return findAudioTrakBox(mp4BoxTree)['edts']['elst']
}

function findVideoElstBox(mp4BoxTree: Mp4BoxTree) {
  return findAudioTrakBox(mp4BoxTree)['edts']['elst']
}
