import React from 'react'
import {graphql} from 'gatsby'
import Page from '../components/Page'
import Features from '../components/Features'

import 'normalize.css'
import '../styles/cayman.css'

export default ({data}) => {
  const {html} = data.file.childMarkdownRemark
  return (
    <Page isHome>
      <Features />
      <section dangerouslySetInnerHTML={{__html: html}} />
    </Page>
  )
}

export const query = graphql`
  {
    file(relativePath: {eq: "quick-start.md"}) {
      childMarkdownRemark {
        html
      }
    }
  }
`
