import React from 'react'
import {graphql} from 'gatsby'
import Page from '../components/Page'

export default ({data}) => (
  <Page title="Usage">
    <div
      dangerouslySetInnerHTML={{__html: data.file.childMarkdownRemark.html}}
    />
  </Page>
)

export const query = graphql`
  {
    file(relativePath: {eq: "usage.md"}) {
      childMarkdownRemark {
        html
      }
    }
  }
`
