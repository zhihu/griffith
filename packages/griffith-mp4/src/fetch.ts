export default class FragmentFetch {
  static queue: FragmentFetch[] = []

  start: number
  xhr: XMLHttpRequest

  constructor(
    url: string,
    start: number,
    end: number,
    callback: (r: ArrayBuffer) => void
  ) {
    this.start = start
    FragmentFetch.queue.push(this)

    const xhr = new XMLHttpRequest()
    this.xhr = xhr
    xhr.open('get', url)
    xhr.responseType = 'arraybuffer'
    xhr.setRequestHeader('Range', `bytes=${start}-${end}`)
    xhr.onload = () => {
      if (xhr.status === 200 || xhr.status === 206) {
        callback(xhr.response as ArrayBuffer)
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
      (item) => item.start !== this.start
    )
  }

  static clear() {
    while (FragmentFetch.queue.length) {
      const item = FragmentFetch.queue.shift()
      item!.xhr.abort()
    }
  }
}
