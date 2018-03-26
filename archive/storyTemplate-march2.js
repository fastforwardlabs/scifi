import React from 'react'
import chroma from 'chroma-js'
import Link from 'gatsby-link'
import styled from 'styled-components'
import logo from '../images/ff-logo-square.png'

let line_height = 20 * 1.45

let cyan = '#00dcec'

let dark_cyan = chroma('#00dcec')
  .darken(0.5)
  .hex()

let lighter_cyan = chroma('#00dcec')
  .brighten(0.5)
  .hex()

function boxShadow(background) {
  return `${line_height / 2 + 1}px 0 0 ${background},
    -${line_height / 2 + 1}px 0 0 ${background}`
}

function halfBoxShadow(background) {
  return `${line_height / 4}px 0 0 ${background},
    -${line_height / 4}px 0 0 ${background}`
}

const CyanLink = styled.span`
  font-weight: bold;
  background: ${lighter_cyan};
  box-shadow: ${halfBoxShadow(lighter_cyan)};
  padding: calc(0.1em) 0 0.15em 0;
  transition: all 0.1s linear;
  &:hover {
    background: ${cyan};
    box-shadow: ${halfBoxShadow(cyan)};
  }
`

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const markdownRemark = data.markdownRemark // data.markdownRemark holds our post data
  const { frontmatter, fields, html } = markdownRemark

  let background = frontmatter.background
  let light_background = chroma(background)
    .brighten(0.5)
    .hex()
  let lighter_background = chroma(background)
    .brighten(1.5)
    .hex()

  const ReportLink = styled.span`
    font-weight: bold;
    background: ${light_background};
    box-shadow: ${halfBoxShadow(light_background)};
    padding: calc(0.1em) 0 0.15em 0;
    transition: all 0.1s linear;
    &:hover {
      background: ${background};
      box-shadow: ${halfBoxShadow(background)};
    }
  `

  const UnderlineLink = styled.span`
    padding-bottom: 0.15em;
    background-position: 0 0.95em;
    background-size: 1em 0.3em;
    background-repeat: repeat-x;
    background-image: linear-gradient(${light_background}, ${light_background});
    transition: all 0.1s linear;
  `

  return (
    <div>
      <div
        style={{
          position: 'relative',
          padding: `${line_height}px ${line_height / 2}px`,
        }}
      >
        <div style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span style={{ color: '#111' }}>Cloudera Fast Forward Labs</span>
            <span
              style={{
                fontStyle: 'normal',
                color: '#111',
                paddingLeft: line_height / 2,
              }}
            >
              <CyanLink>SciFi</CyanLink>
            </span>
          </Link>
        </div>
        <div
          style={{
            position: 'absolute',
            right: line_height / 2,
            top: line_height / 2,
            height: line_height * 2,
            width: line_height * 2,
            backgroundImage: `url(${logo})`,
            backgroundSize: 'contain',
          }}
        />
      </div>

      <div
        style={{
          padding: `${line_height}px ${line_height / 2}px ${line_height * 1}px`,
          // color: background,
        }}
      >
        <div className="allcaps bold spaced">
          From the {/* <span */}
          {/*   className="" */}
          {/*   style={{ */}
          {/*     fontWeight: 'bold', */}
          {/*   }} */}
          {/* > */}
          {/*   <span */}
          {/*     className="allcaps" */}
          {/*     style={ */}
          {/*       { */}
          {/*         // color: background */}
          {/*       } */}
          {/*     } */}
          {/*   > */}
          {/*     {frontmatter.report} */}
          {/*   </span>{' '} */}
          {/* </span> */}
          Report
        </div>
      </div>

      <div style={{ padding: `0 0 ${line_height}px 0` }}>
        {/* <div */}
        {/*   style={{ */}
        {/*     padding: `0px ${line_height / 2}px`, */}
        {/*   }} */}
        {/* > */}
        {/*   <span */}
        {/*     className="allcaps bold spaced lh-highlight" */}
        {/*     style={{ */}
        {/*       background: '#fff', */}
        {/*       boxShadow: boxShadow('#fff'), */}
        {/*     }} */}
        {/*   > */}
        {/*     From the report */}
        {/*   </span> */}
        {/* </div> */}

        <div
          style={{
            padding: `${line_height * 0}px ${line_height / 2}px 0`,
            position: 'relative',
            background: '#efefef',
            // paddingBottom: line_height,
            // paddingBottom: line_height,
            //
          }}
        >
          <div
            style={{
              position: 'relative',
              // marginTop: `-${line_height}px`
            }}
          >
            <span
              style={{
                fontWeight: 'bold',
                // fontSize: line_height * 2 / 1.19,
                // lineHeight: 1.19,
                // background: '#fff',
                // boxShadow: boxShadow('#fff'),
              }}
            >
              <span style={{}}>{frontmatter.report_title}</span>
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              minHeight: line_height * 7,
              position: 'relative',
              // padding: `${line_height / 2}px 0`,
              margin: `${line_height * 0}px -${line_height /
                2}px ${line_height * 0}px`,
            }}
          >
            {fields.report_strip ? (
              <div style={{ position: 'relative' }}>
                <div
                  className="abs-stretch"
                  style={{
                    backgroundImage: `url('${fields.report_strip.publicURL}')`,
                    backgroundSize: `auto ${line_height * 7}px`,
                    backgroundPosition: 'left center',
                    backgroundRepeat: 'no-repeat',
                  }}
                />
              </div>
            ) : null}
          </div>

          <div style={{ padding: `0 0 ${line_height * 0}px 0` }}>
            <span
              className="lh-highlight"
              style={{
                fontStyle: 'italic',
                // background: '#fff',
                // boxShadow: boxShadow('#fff'),
              }}
            >
              Nam placerat sodales rutrum. Proin condimentum, nisi ut aliquet
              placerat, metus diam blandit odio, ac venenatis augue diam eget
              diam.
            </span>
          </div>
        </div>
      </div>

      <div style={{ paddingTop: line_height }}>
        <h1
          style={{
            fontSize: line_height * 2 / 1.19,
            lineHeight: 1.19,
            padding: `${line_height * 0}px ${line_height / 2}px`,
            margin: 0,
            display: 'block',
            // background: frontmatter.background,
            // textAlign: 'center',
          }}
        >
          <span style={{}}>{frontmatter.title}</span>
        </h1>
        <div
          className=""
          style={{
            // background: lighter_background,
            fontStyle: 'italic',
            padding: `${line_height * 1}px ${line_height * 2}px 0`,
            // textAlign: 'center',
            // background: lighter_background,
          }}
        >
          by{' '}
          <span className="bold">
            <UnderlineLink>Grant Custer</UnderlineLink>
          </span>
        </div>

        <div style={{ padding: `${line_height}px ${line_height / 2}px 0` }}>
          <div style={{ maxWidth: 660, margin: '0 auto' }}>
            <div
              className="blog-post-content"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
      </div>

      <div style={{ padding: `${line_height}px 0` }}>
        <div>
          <div
            className="allcaps bold spaced"
            style={{
              padding: `0 ${line_height / 2}px ${line_height}px`,
            }}
          >
            About
          </div>
        </div>
        <div
          style={{
            padding: `0 ${line_height / 2}px`,
            fontStyle: 'italic',
            paddingBottom: line_height,
          }}
        >
          <span className="bold">Cloudera Fast Forward Labs</span> does applied
          machine learning research and consulting.
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto auto 1fr',
            padding: `0 ${line_height / 2}px`,
            gridColumnGap: line_height / 2,
          }}
        >
          <div>
            <CyanLink>Website</CyanLink>
          </div>
          <div>
            <CyanLink>Blog</CyanLink>
          </div>
          <div>
            <CyanLink>Twitter</CyanLink>
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
        report_strip {
          publicURL
        }
      }
    }
  }
`
