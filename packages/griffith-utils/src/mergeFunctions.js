export default function mergeFunctions(fn1, fn2) {
  return (...arg) => {
    if (fn1) fn1(...arg)
    if (fn2) fn2(...arg)
  }
}
