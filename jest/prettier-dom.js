import prettier from 'prettier'

module.exports = {
  test: (v) => typeof Element !== 'undefined' && v instanceof Element,
  print: (v) => {
    return prettier.format(v.outerHTML, {parser: 'html'})
  },
}
