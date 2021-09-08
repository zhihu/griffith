// copy from https://github.com/google/shaka-player/blob/master/lib/polyfill/mediasource.js#L125
function abortPolyfill() {
  const addSourceBuffer = MediaSource.prototype.addSourceBuffer
  MediaSource.prototype.addSourceBuffer = function (...varArgs) {
    const sourceBuffer = addSourceBuffer.apply(this, varArgs)
    sourceBuffer.abort = function () {} // Stub out for buggy implementations.
    return sourceBuffer
  }
}

export {abortPolyfill}
