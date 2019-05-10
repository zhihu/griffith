import React from 'react'

const fullYear = new Date().getFullYear()

const SiteFooter = () => (
  <footer className="site-footer">
    <span className="site-footer-owner">© {fullYear} Zhihu</span>
    <span className="site-footer-credits">
      Styles based on{' '}
      <a href="https://github.com/jasonlong/cayman-theme">Cayman theme</a> by{' '}
      <a href="https://twitter.com/jasonlong">Jason Long</a>.
    </span>
  </footer>
)

export default SiteFooter
