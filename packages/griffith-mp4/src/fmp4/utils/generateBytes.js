export function generatePredefined(length) {
  return generateZeroBytes(length)
}

export function generateReserved(length) {
  return generateZeroBytes(length)
}

function generateZeroBytes(bytes) {
  return new Uint8Array(bytes)
}
