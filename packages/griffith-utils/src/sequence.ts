export default function sequence(...fns: any[]) {
  return (...args: any[]) => fns.reduce((_, fn) => fn(...args), null)
}
