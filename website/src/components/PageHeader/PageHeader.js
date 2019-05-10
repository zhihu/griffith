import React from 'react'
import {Link} from 'gatsby'

const PageHeader = ({isHome, title = 'Griffith'}) => (
  <header className="page-header">
    <h1 className="project-name">{title}</h1>
    {isHome && (
      <h2 className="poject-tagline">A React-based Web video player</h2>
    )}
    {isHome && (
      <nav>
        <a
          href="https://github.com/zhihu/griffith"
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
        >
          View on GitHub
        </a>
        <Link to="/usage/" className="btn">
          Lean More
        </Link>
      </nav>
    )}
  </header>
)

export default PageHeader
