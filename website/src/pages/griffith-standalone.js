import React from 'react'
import {graphql} from 'gatsby'
import Page from '../components/Page'

export default ({data}) => (
  <Page title="griffith-standalone">
    <div
      dangerouslySetInnerHTML={{__html: data.file.childMarkdownRemark.html}}
    />
  </Page>
)

export const query = graphql`
  {
    file(relativePath: {eq: "griffith-standalone.md"}) {
      childMarkdownRemark {
        html
      }
    }
  }
`
