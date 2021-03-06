import React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import ReportInfo from '../components/ReportInfo.js'
import Story from '../components/Story.js'
import { withPrefix } from 'gatsby-link'
import { domain } from '../utils/style.js'

export default ({ data }) => {
  const markdownRemark = data.markdownRemark
  const { frontmatter, excerpt, fields, html } = markdownRemark

  let title = `${frontmatter.title} - Cloudera Fast Forward Labs`
  let description = `by ${frontmatter.author}. ` + excerpt

  let image_preview = frontmatter.preview_image
    ? domain + frontmatter.preview_image.publicURL
    : null

  return (
    <div>
      <Helmet
        title={title}
        meta={[
          {
            name: 'description',
            content: description,
          },
          {
            name: 'og:url',
            content: domain + frontmatter.path,
          },
          {
            name: 'og:title',
            content: title,
          },
          {
            name: 'og:description',
            content: description,
          },
          {
            name: 'og:image',
            content: image_preview,
          },
          {
            name: 'twitter:card',
            content: 'summary_large_image',
          },
          {
            name: 'twitter:title',
            content: title,
          },
          {
            name: 'twitter:description',
            content: description,
          },
          {
            name: 'twitter:image',
            content: image_preview,
          },
          {
            name: 'theme-color',
            content: frontmatter.background,
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
        preview_image {
          publicURL
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
        report_strip {
          publicURL
        }
        prologue
        report_sentence
      }
    }
  }
`
