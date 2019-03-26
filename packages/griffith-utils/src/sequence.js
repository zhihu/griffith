export default function sequence(...fns) {
  return (...args) => fns.reduce((_, fn) => fn(...args), null)
}
