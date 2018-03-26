import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import ReportInfo from '../components/ReportInfo.js'
import Story from '../components/Story.js'

export default ({ data }) => {
  const markdownRemark = data.markdownRemark
  const { frontmatter, excerpt, fields, html } = markdownRemark

  return (
    <div>
      <Helmet
        title={`${frontmatter.title} - Cloudera Fast Forward Labs`}
        meta={[
          {
            name: 'description',
            content:
              excerpt,
          },
        ]}
      />
      <ReportInfo frontmatter={frontmatter} fields={fields} />
      <Story frontmatter={frontmatter} fields={fields} html={html} />
    </div>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        report
        background
        report_title
        author
        author_link
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
        report_gif {
          publicURL
        }
        report_strip {
          publicURL
        }
        prologue
        report_sentence
      }
    }
  }
`
