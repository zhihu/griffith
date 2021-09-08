// copy from https://github.com/google/shaka-player/blob/master/lib/polyfill/mediasource.js#L125
function abortPolyfill() {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const addSourceBuffer = MediaSource.prototype.addSourceBuffer
  MediaSource.prototype.addSourceBuffer = function (...varArgs) {
    const sourceBuffer = addSourceBuffer.apply(this, varArgs)
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    sourceBuffer.abort = function () {} // Stub out for buggy implementations.
    return sourceBuffer
  }
}

export {abortPolyfill}
