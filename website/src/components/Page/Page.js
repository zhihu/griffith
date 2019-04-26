import React from 'react'
import Helmet from 'react-helmet'
import {graphql, StaticQuery} from 'gatsby'
import MainContent from '../MainContent'
import PageHeader from '../PageHeader'
import SiteFooter from '../SiteFooter'

const Page = ({children, isHome, title}) => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={({site}) => {
      const siteTitle = site.siteMetadata.title
      const documentTitle = title ? `${title} - ${siteTitle}` : siteTitle
      return (
        <>
          <Helmet title={documentTitle} />
          <PageHeader isHome={isHome} title={title || documentTitle} />
          <MainContent>
            {children} <SiteFooter />
          </MainContent>
        </>
      )
    }}
  />
)

export default Page
