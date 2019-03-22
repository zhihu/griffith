export const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

export const isAndroid = /(android)/i.test(navigator.userAgent)

export const isSafari = /^((?!chrome|android).)*safari/i.test(
  navigator.userAgent
)

export default {
  isMobile,
  isAndroid,
  isSafari,
}
