import React from 'react'
import chroma from 'chroma-js'
import styled from 'styled-components'

let line_height = 18 * 1.45

function boxShadowHighlight(color) {
  let string = `-${line_height / 4}px 0 0 ${color}, ${line_height /
    4}px 0 0 ${color}`
  return string
}

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const markdownRemark = data.markdownRemark // data.markdownRemark holds our post data
  const { frontmatter, fields, html } = markdownRemark
  let line_height = 18 * 1.45
  let background = frontmatter.background
  return (
    <div>
      <div className="blog-post">
        <div
          className="allcaps"
          style={{
            background: chroma(background)
              .brighten(1.5)
              .desaturate(1),
            color: chroma(background)
              .darken(2)
              .desaturate(1.5),
            fontWeight: 'bold',
            padding: `0 ${line_height}px`,
            letterSpacing: '0.1em',
          }}
        >
          The report
        </div>
        <div
          style={{
            position: 'relative',
            background: '#efefef',
            paddingLeft: line_height / 2,
            // marginBottom: line_height / 2,
          }}
        >
          <div
            className=""
            style={{
              position: 'absolute',
              backgroundImage: `url('${fields.report_gif.publicURL}')`,
              backgroundSize: `contain`,
              backgroundPosition: 'right top',
              backgroundColor: '#efefef',
              right: 0,
              top: 0,
              bottom: 0,
              left: 0,
              backgroundPosition: 'right center',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
            }}
          />

          <div
            style={{
              padding: line_height,
              position: 'relative',
              paddingLeft: line_height / 2,
            }}
          >
            <div style={{ marginBottom: line_height }}>
              <span
                style={{
                  fontWeight: 'bold',
                  fontSize: line_height * 2 / 1.19,
                  lineHeight: 1.19,
                  background: '#fff',
                  boxShadow: `${line_height / 4}px 0 0 #fff, -${line_height /
                    4}px 0 0 #fff`,
                }}
              >
                <span
                  className="smallcaps"
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  <span className="allcaps" style={{ color: background }}>
                    {frontmatter.report}
                  </span>{' '}
                </span>
                {frontmatter.report_title}
              </span>
            </div>

            <div style={{ marginBottom: line_height }}>
              <span
                className="lh-highlight"
                style={{
                  fontStyle: 'italic',
                  background: '#fff',
                  boxShadow: boxShadowHighlight('#fff'),
                }}
              >
                Recent advances in deep learning allow us to use the semantic
                content of items in recommendation systems, addressing a
                weakness of traditional methods. In this report we show how
                using the content of items can help solve common recommendation
                pitfalls such as the cold start problem, and open up new product
                possibilities.
              </span>
            </div>
            <div>
              <span
                className="lh-highlight"
                style={{
                  background: '#fff',
                  fontStyle: 'italic',
                  boxShadow: boxShadowHighlight('#fff'),
                }}
              >
                More about this report: Blog Website
              </span>
            </div>
          </div>
        </div>

        <div style={{}}>
          <div
            className="allcaps"
            style={{
              background: chroma(background)
                .brighten(1.5)
                .desaturate(1),
              color: chroma(background)
                .darken(2)
                .desaturate(1.5),
              fontSmoothing: 'antialiased',
              letterSpacing: '0.1em',
              fontWeight: 'bold',
              padding: `0 ${line_height}px`,
            }}
          >
            The story
          </div>

          <h1
            style={{
              fontSize: line_height * 2 / 1.19,
              lineHeight: 1.19,
              padding: `${line_height}px ${line_height / 1}px`,
              margin: 0,
              background: frontmatter.background,
              textAlign: 'center',
            }}
          >
            <span
              style={{
                background: frontmatter.background,
              }}
            >
              {frontmatter.title}
            </span>
          </h1>
        </div>

        <div style={{}}>
          <div style={{ maxWidth: 660, margin: '0 auto' }}>
            <div
              className="blog-post-content"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
      </div>
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
      }
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
      }
    }
  }
`
