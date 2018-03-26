import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Header from '../components/Header.js'
import './fonts.css'
import './index.css'
import './custom.css'

const TemplateWrapper = ({ children, data }) => {
  let line_height = 18 * 1.45
  let sidebar_width = line_height * 14
  return (
    <div>
      <Helmet
        title="Gatsby Default Starter"
        meta={[
          { name: 'description', content: 'Sample' },
          { name: 'keywords', content: 'sample, something' },
        ]}
      />
      <div
        style={{
          fontFamily: 'ChambersSansWeb',
          display: 'grid',
          gridTemplateColumns: `${sidebar_width}px 1fr`,
        }}
      >
        <Header data={data} />
        <div
          className="scroller"
          style={{ height: '100vh', overflowY: 'auto' }}
        >
          {children()}
        </div>
      </div>
    </div>
  )
}

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper

export const pageQuery = graphql`
  query HeaderQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___report], order: DESC }) {
      edges {
        node {
          frontmatter {
            title
            path
            report
            report_title
            background
            preview_image {
              childImageSharp {
                sizes(maxWidth: 800) {
                  src
                  srcSet
                }
              }
            }
          }
          excerpt
          fields {
            report_image {
              childImageSharp {
                sizes(maxWidth: 800) {
                  src
                  srcSet
                }
              }
            }
          }
        }
      }
    }
  }
`
