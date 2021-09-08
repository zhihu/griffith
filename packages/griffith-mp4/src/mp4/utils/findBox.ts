export default function findBox(mp4BoxTree: any, type: any) {
  switch (type) {
    case 'moov':
      return findMoovBox(mp4BoxTree)
    case 'mvhd':
      return findMvhdBox(mp4BoxTree)
    case 'videoTrak':
      return findVideoTrakBox(mp4BoxTree)
    case 'audioTrak':
      return findAudioTrakBox(mp4BoxTree)
    case 'videoTkhd':
      return findVideoTkhdBox(mp4BoxTree)
    case 'audioTkhd':
      return findAudioTkhdBox(mp4BoxTree)
    case 'videoStbl':
      return findVideoStblBox(mp4BoxTree)
    case 'audioStbl':
      return findAudioStblBox(mp4BoxTree)
    case 'videoStsc':
      return findVideoStscBox(mp4BoxTree)
    case 'audioStsc':
      return findAudioStscBox(mp4BoxTree)
    case 'avcC':
      return findAvcCBox(mp4BoxTree)
    case 'esds':
      return findEsdsBox(mp4BoxTree)
    case 'videoStco':
      return findVideoStcoBox(mp4BoxTree)
    case 'audioStco':
      return findAudioStcoBox(mp4BoxTree)
    case 'videoStts':
      return findVideoSttsBox(mp4BoxTree)
    case 'audioStts':
      return findAudioSttsBox(mp4BoxTree)
    case 'audioMdhd':
      return findAudioMdhdBox(mp4BoxTree)
    case 'videoMdhd':
      return findVideoMdhdBox(mp4BoxTree)
    case 'videoStss':
      return findVideoStssBox(mp4BoxTree)
    case 'videoStsz':
      return findVideoStszBox(mp4BoxTree)
    case 'videoCtts':
      return findVideoCttsBox(mp4BoxTree)
    case 'audioStsz':
      return findAudioStszBox(mp4BoxTree)
    case 'mp4a':
      return findMp4aBox(mp4BoxTree)
    case 'audioElst':
      return findAudioElstBox(mp4BoxTree)
    case 'videoElst':
      return findVideoElstBox(mp4BoxTree)

    default:
      return {}
  }
}

function findMoovBox(mp4BoxTree: any) {
  return mp4BoxTree['moov']
}

function findMvhdBox(mp4BoxTree: any) {
  return findMoovBox(mp4BoxTree)['mvhd']
}

function findVideoTrakBox(mp4BoxTree: any) {
  return findMoovBox(mp4BoxTree)['videoTrak']
}

function findVideoTkhdBox(mp4BoxTree: any) {
  return findVideoTrakBox(mp4BoxTree)['tkhd']
}

function findVideoStblBox(mp4BoxTree: any) {
  return findVideoTrakBox(mp4BoxTree)['mdia']['minf']['stbl']
}

function findAudioTrakBox(mp4BoxTree: any) {
  return findMoovBox(mp4BoxTree)['audioTrak']
}

function findAudioStblBox(mp4BoxTree: any) {
  return findAudioTrakBox(mp4BoxTree)['mdia']['minf']['stbl']
}

function findAudioTkhdBox(mp4BoxTree: any) {
  return findAudioTrakBox(mp4BoxTree)['tkhd']
}

function findVideoStscBox(mp4BoxTree: any) {
  return findVideoStblBox(mp4BoxTree)['stsc']
}

function findAudioStscBox(mp4BoxTree: any) {
  return findAudioStblBox(mp4BoxTree)['stsc']
}

function findAvcCBox(mp4BoxTree: any) {
  return findVideoStblBox(mp4BoxTree)['stsd']['avc1'][0]['avcC']
}

function findMp4aBox(mp4BoxTree: any) {
  return findAudioStblBox(mp4BoxTree)['stsd']['mp4a'][0]
}

function findEsdsBox(mp4BoxTree: any) {
  return findMp4aBox(mp4BoxTree)['esds']
}

function findVideoStcoBox(mp4BoxTree: any) {
  return findVideoStblBox(mp4BoxTree)['stco']
}

function findAudioStcoBox(mp4BoxTree: any) {
  return findAudioStblBox(mp4BoxTree)['stco']
}

function findVideoSttsBox(mp4BoxTree: any) {
  return findVideoStblBox(mp4BoxTree)['stts']
}

function findAudioSttsBox(mp4BoxTree: any) {
  return findAudioStblBox(mp4BoxTree)['stts']
}

function findVideoMdhdBox(mp4BoxTree: any) {
  return findVideoTrakBox(mp4BoxTree)['mdia']['mdhd']
}

function findAudioMdhdBox(mp4BoxTree: any) {
  return findAudioTrakBox(mp4BoxTree)['mdia']['mdhd']
}

function findVideoStssBox(mp4BoxTree: any) {
  return findVideoStblBox(mp4BoxTree)['stss']
}

function findVideoStszBox(mp4BoxTree: any) {
  return findVideoStblBox(mp4BoxTree)['stsz']
}

function findAudioStszBox(mp4BoxTree: any) {
  return findAudioStblBox(mp4BoxTree)['stsz']
}

function findVideoCttsBox(mp4BoxTree: any) {
  return findVideoStblBox(mp4BoxTree)['ctts']
}

function findAudioElstBox(mp4BoxTree: any) {
  return findAudioTrakBox(mp4BoxTree)['edts']['elst']
}

function findVideoElstBox(mp4BoxTree: any) {
  return findAudioTrakBox(mp4BoxTree)['edts']['elst']
}
