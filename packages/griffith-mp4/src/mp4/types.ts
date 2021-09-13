export type Interval = [number, number]

export type TimeOffsetInterval = {
  offsetInterVal: Interval
  timeInterVal: Interval
}

export type Sample = {
  compositionTimeOffset?: number
  duration: number
  size: number
  start: number
  end: number
  bufferStart: number
}

// 由 __tests__/__mocks__/mp4BoxTree 生成
export type Mp4BoxTree = {
  free: Record<string, unknown>
  ftyp: {
    compatibleBrands: string[]
    majorBrand: string
    minorVersion: number
  }
  mdat: {
    data: {
      data: number[]
      type: string
    }
    start: number
  }
  moov: {
    audioTrak: {
      edts: {
        elst: {
          entries: {
            mediaRateFraction: number
            mediaRateInteger: number
            mediaTime: number
            segmentDuration: number
          }[]
          flags: number
          version: number
        }
      }
      mdia: {
        hdlr: {
          flags: number
          handlerType: string
          handlerType2: string
          name: string
          version: number
        }
        mdhd: {
          creationTime: number
          duration: number
          flags: number
          languageString: string
          modificationTime: number
          timescale: number
          version: number
        }
        minf: {
          dinf: {
            dref: {
              flags: number
              url: {
                flags: number
                version: number
              }[]
              version: number
            }
          }
          smhd: {
            data: number[]
            flags: number
            version: number
          }
          stbl: {
            stco: {
              flags: number
              samples: {
                chunkOffset: number
              }[]
              version: number
            }
            stsc: {
              flags: number
              samples: {
                firstChunk: number
                sampleDescriptionIndex: number
                samplesPerChunk: number
              }[]
              version: number
            }
            stsd: {
              flags: number
              mp4a: {
                channelCount: number
                dataReferenceIndex: number
                esds: {
                  ESDescrTag: {
                    DecSpecificDescrTag: {
                      audioConfig: number[]
                      size: number
                    }
                    DecoderConfigDescrTag: {
                      avgBitrate: number
                      bufferSize: number
                      maxBitrate: number
                      objectTypeIndication: number
                      size: number
                      streamType: number
                      upStream: number
                    }
                    ESID: number
                    size: number
                    streamPriority: number
                  }
                  flags: number
                  version: number
                }
                sampleRate: number
                sampleSize: number
              }[]
              version: number
            }
            stsz: {
              flags: number
              sampleSize: number
              samples: {
                entrySize: number
              }[]
              version: number
            }
            stts: {
              flags: number
              samples: {
                sampleCount: number
                sampleDelta: number
              }[]
              version: number
            }
          }
        }
      }
      tkhd: {
        alternateGroup: number
        creationTime: number
        duration: number
        flags: number
        height: number
        layer: number
        matrix: number[]
        modificationTime: number
        trackID: number
        version: number
        volume: number
        width: number
      }
    }
    mvhd: {
      creationTime: number
      duration: number
      flags: number
      matrix: number[]
      modificationTime: number
      nextTrackID: number
      rate: number
      timescale: number
      version: number
      volume: number
    }
    udta: {
      meta: {
        flags: number
        version: number
      }
      thmb?: {
        data: number
      }
    }
    videoTrak: {
      edts: {
        elst: {
          entries: {
            mediaRateFraction: number
            mediaRateInteger: number
            mediaTime: number
            segmentDuration: number
          }[]
          flags: number
          version: number
        }
      }
      mdia: {
        hdlr: {
          flags: number
          handlerType: string
          handlerType2: string
          name: string
          version: number
        }
        mdhd: {
          creationTime: number
          duration: number
          flags: number
          languageString: string
          modificationTime: number
          timescale: number
          version: number
        }
        minf: {
          dinf: {
            dref: {
              flags: number
              url: {
                flags: number
                version: number
              }[]
              version: number
            }
          }
          stbl: {
            ctts: {
              flags: number
              samples: {
                sampleCount: number
                sampleOffset: number
              }[]
              version: number
            }
            sdtp?: {
              flags: number
              samplesFlag: {
                dependsOn: number
                hasRedundancy: number
                isDepended: number
                isLeading: number
              }[]
              version: number
            }
            stco: {
              flags: number
              samples: {
                chunkOffset: number
              }[]
              version: number
            }
            stsc: {
              flags: number
              samples: {
                firstChunk: number
                sampleDescriptionIndex: number
                samplesPerChunk: number
              }[]
              version: number
            }
            stsd: {
              avc1: {
                avcC: {
                  AVCLevelIndication: number
                  AVCProfileIndication: number
                  PPS: number[]
                  SPS: number[]
                  configurationVersion: number
                  lengthSizeMinusOne: number
                  profileCompatibility: number
                }
                compressorname: string
                dataReferenceIndex: number
                depth: number
                frameCount: number
                height: number
                horizresolution: number
                vertresolution: number
                width: number
              }[]
              flags: number
              version: number
            }
            stss: {
              flags: number
              samples: {
                sampleNumber: number
              }[]
              version: number
            }
            stsz: {
              flags: number
              sampleSize: number
              samples: {
                entrySize: number
              }[]
              version: number
            }
            stts: {
              flags: number
              samples: {
                sampleCount: number
                sampleDelta: number
              }[]
              version: number
            }
          }
          vmhd: {
            flags: number
            graphicsmode: number
            opcolor: number[]
            version: number
          }
        }
      }
      tkhd: {
        alternateGroup: number
        creationTime: number
        duration: number
        flags: number
        height: number
        layer: number
        matrix: number[]
        modificationTime: number
        trackID: number
        version: number
        volume: number
        width: number
      }
    }
  }
}
