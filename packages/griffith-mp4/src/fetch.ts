export default class FragmentFetch {
  static queue = []

  start: any
  xhr: any

  constructor(url: any, start: any, end: any, callback: any) {
    this.start = start
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'this' is not assignable to param... Remove this comment to see the full error message
    FragmentFetch.queue.push(this)

    const xhr = new XMLHttpRequest()
    this.xhr = xhr
    xhr.open('get', url)
    xhr.responseType = 'arraybuffer'
    xhr.setRequestHeader('Range', `bytes=${start}-${end}`)
    xhr.onload = () => {
      if (xhr.status === 200 || xhr.status === 206) {
        callback(xhr.response)
      }
      this.remove()
    }
    xhr.send()

    xhr.onerror = () => {
      this.remove()
    }
    xhr.onabort = () => {
      this.remove()
    }
  }

  remove = () => {
    FragmentFetch.queue = FragmentFetch.queue.filter(
      (item) => (item as any).start !== this.start
    )
  }

  static clear() {
    while (FragmentFetch.queue.length) {
      const item = FragmentFetch.queue.shift()
      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      item.xhr.abort()
    }
  }
}
