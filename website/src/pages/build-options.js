import React from 'react'
import {graphql} from 'gatsby'
import Page from '../components/Page'

export default ({data}) => (
  <Page title="Build Options">
    <div
      dangerouslySetInnerHTML={{__html: data.file.childMarkdownRemark.html}}
    />
  </Page>
)

export const query = graphql`
  {
    file(relativePath: {eq: "build-options.md"}) {
      childMarkdownRemark {
        html
      }
    }
  }
`
