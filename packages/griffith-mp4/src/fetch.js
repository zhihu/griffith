export default class FragmentFetch {
  static queue = []

  constructor(url, start, end, callback) {
    this.start = start
    this.controller = new AbortController()
    FragmentFetch.queue.push(this)
    return fetch(url, {
      headers: {
        Range: `bytes=${start}-${end}`,
      },
      signal: this.controller.signal,
    })
      .then(res => {
        callback(res.arrayBuffer())
        this.remove()
      })
      .catch(() => {
        this.remove()
      })
  }

  remove = () => {
    FragmentFetch.queue = FragmentFetch.queue.filter(
      item => item.start !== this.statr
    )
  }

  static clear() {
    while (FragmentFetch.queue.length) {
      const item = FragmentFetch.queue.shift()
      item.controller.abort()
    }
  }
}
