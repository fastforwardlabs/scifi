import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import logo from '../images/ff-logo-square.png'

import chroma from 'chroma-js'
import styled from 'styled-components'

let line_height = 18 * 1.45

function getHorizontalPosition() {
  let options = ['left', 'center', 'right']
  return options[Math.floor(Math.random() * 3)]
}

function getVerticalPosition() {
  let options = ['top', 'center', 'bottom']
  return options[Math.floor(Math.random() * 3)]
}

function boxShadowHighlight(color) {
  let string = `-${line_height / 4}px 0 0 ${color}, ${line_height /
    4}px 0 0 ${color}`
  return string
}

export default function Posts(props) {
  const posts = props.data.allMarkdownRemark.edges
  let line_height_divider = 1.45
  let post_row_number = 14
  let min_width = 400
  let max_width = 1200
  let difference = max_width - min_width
  let tween = `((100vw - ${min_width}px) / ${difference})`
  let sidebar_width = line_height * 14
  // let tween = `100vw`
  return (
    <div
      style={
        {
          // margin: '0 auto',
          // maxWidth: 660,
          // padding: '0px 1.0875rem 1.45rem',
          // paddingTop: 0,
          // display: 'grid',
          // gridTemplateColumns: 'repeat(2, 1fr)',
          // width: '100%',
          // margin: `${line_height * 2}px auto`,
          // padding: `0 ${line_height / 2}px`,
          // maxWidth: 360,
        }
      }
    >
      {/* <div>Cloudera Fast Forward Labs</div> */}
      {/* <div> */}
      {/*   A collection of short fiction inspired by new developments in machine */}
      {/*   learning */}
      {/* </div> */}
      {/* <div */}
      {/*   style={{ */}
      {/*     // gridColumn: '1 / 3', */}
      {/*     fontSize: 165, */}
      {/*     lineHeight: 1, */}
      {/*     fontWeight: 'bold', */}
      {/*   }} */}
      {/* > */}
      {/*   SciFi */}
      {/* </div> */}
      {posts.map(({ node }) => {
        let report_height = 60 + Math.random() * 40
        let report_width = 60 + Math.random() * 40
        let preview_height = 60 + Math.random() * 40
        let preview_width = 60 + Math.random() * 40
        let background = node.frontmatter.background
        let lighter_background = chroma(background)
          .brighten(0.5)
          .hex()

        const TitleBacker = styled.span`
          background: ${lighter_background};
          box-shadow: ${line_height / 4}px 0 0 ${lighter_background},
            -${line_height / 4}px 0 0 ${lighter_background};
          &:hover {
            background: ${background};
            box-shadow: ${line_height / 4}px 0 0 ${background},
              -${line_height / 4}px 0 0 ${background};
          }
        `

        return (
          <div
            className="path-trigger"
            style={{
              // padding: `${line_height / 2}px 0 ${line_height}px`,
              position: 'relative',
              minHeight: line_height * 6 * 2 + 'px',
              padding: `${line_height}px ${line_height / 2 +
                line_height / 4}px`,
              cursor: 'pointer',
              // borderBottom: `solid ${line_height}px ${background}`,
              display: 'grid',
              gridTemplateRows: 'auto 1fr auto',
              overflow: 'hidden',
            }}
          >
            <div
              className=""
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                // background: '#efefef',
                backgroundImage: `url('${
                  node.fields.report_image.childImageSharp.sizes.src
                }')`,
                backgroundSize: `auto ${line_height * 6}px`,
                backgroundPosition: 'left top',
                backgroundColor: '#efefef',
              }}
            >
              {node.fields.report_image && false ? (
                <img
                  style={{
                    position: 'absolute',
                    margin: 0,
                    width: report_width + '%',
                    height: `${report_height}%`,
                    left: Math.random() * (100 - report_width) + '%',
                    top: Math.random() * (100 - report_height) + '%',
                    objectFit: 'contain',
                    objectPosition: `${getHorizontalPosition()} ${getVerticalPosition()}`,
                  }}
                  src={node.fields.report_image.childImageSharp.sizes.src}
                />
              ) : null}
            </div>
            <div
              className="path"
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                backgroundImage: `url('${
                  node.frontmatter.preview_image.childImageSharp.sizes.src
                }')`,
                backgroundSize: `auto ${line_height * 6}px`,
                backgroundPosition: 'right top',
                backgroundColor: '#fff',
              }}
            >
              {node.fields.report_image && false ? (
                <img
                  style={{
                    position: 'absolute',
                    margin: 0,
                    width: preview_width + '%',
                    height: `${preview_height}%`,
                    left: Math.random() * (100 - preview_width) + '%',
                    top: Math.random() * (100 - preview_height) + '%',
                    objectFit: 'contain',
                    objectPosition: `${getHorizontalPosition()} ${getVerticalPosition()}`,
                  }}
                  src={node.frontmatter.preview_image.childImageSharp.sizes.src}
                />
              ) : null}
            </div>
            <div
              style={{
                position: 'relative',
                // marginBottom: line_height / 2,
                // color: node.frontmatter.background,
              }}
            >
              <span
                className="lh-highlight"
                style={{
                  background: '#fff',
                  boxShadow: boxShadowHighlight('#fff'),
                }}
              >
                <span style={{ fontStyle: 'italic' }}>from</span>{' '}
                <span
                  style={{
                    fontWeight: 'bold',
                  }}
                >
                  <span className="allcaps" style={{ color: background }}>
                    {node.frontmatter.report}:
                  </span>{' '}
                  {node.frontmatter.report_title}
                </span>
              </span>
            </div>
            <div
              style={{
                // minHeight: 7 * line_height,
                paddingBottom: line_height,
              }}
            >
              <div
                style={{
                  fontSize: line_height * 2 / 1.19,
                  lineHeight: 1.19,
                  position: 'relative',
                }}
              >
                <Link
                  to={node.frontmatter.path}
                  style={{
                    color: 'black',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    // background: '#fff',
                    // background: background,
                    marginBottom: line_height,
                    // boxShadow: `${line_height /
                    //   4}px 0 0 ${background}, -${line_height /
                    //   4}px 0 0 ${background}`,
                  }}
                >
                  <TitleBacker>{node.frontmatter.title}</TitleBacker>
                </Link>
              </div>
              <div
                style={{
                  position: 'relative',
                  fontStyle: 'italic',
                }}
              >
                <span
                  className="lh-highlight"
                  style={{
                    background: '#fff',
                    boxShadow: boxShadowHighlight('#fff'),
                  }}
                >
                  by <span style={{ fontWeight: 'bold' }}>Grant Custer</span>
                </span>
              </div>
            </div>
            <div
              style={{
                display: 'grid',
                justifyItems: 'end',
              }}
            >
              <div
                className="left-50-with-sidebar"
                style={{
                  position: 'relative',
                  fontStyle: 'italic',
                }}
              >
                <div>
                  <span
                    className="lh-highlight"
                    style={{
                      background: '#fff',
                      boxShadow: boxShadowHighlight('#fff'),
                    }}
                  >
                    {node.excerpt}
                  </span>
                </div>
                <div
                  style={{
                    textAlign: 'right',
                    fontWeight: 'bold',
                  }}
                >
                  <Link
                    className="lh-highlight"
                    style={{
                      background: background,
                      color: '#000',
                      textDecoration: 'none',
                      boxShadow: boxShadowHighlight(background),
                    }}
                    to={node.frontmatter.path}
                  >
                    ...read story
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
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
