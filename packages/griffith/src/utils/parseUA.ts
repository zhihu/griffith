export default function parseUA(userAgent: string) {
  return {
    isIE: /MSIE|Trident/i.test(userAgent),
    isMobile: /iPhone|iPad|iPod|Android/i.test(userAgent),
    isAndroid: /(android)/i.test(userAgent),
    isSafari: /^((?!chrome|android).)*safari/i.test(userAgent),
  }
}
