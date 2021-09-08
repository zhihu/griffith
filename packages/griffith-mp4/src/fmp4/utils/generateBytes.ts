export function generatePredefined(length: any) {
  return generateZeroBytes(length)
}

export function generateReserved(length: any) {
  return generateZeroBytes(length)
}

function generateZeroBytes(bytes: any) {
  return new Uint8Array(bytes)
}
