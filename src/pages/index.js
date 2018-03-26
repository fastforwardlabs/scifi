import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import logo from '../images/ff-logo-square.png'

import chroma from 'chroma-js'
import styled from 'styled-components'

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

const CyanLink = styled.span`
  font-weight: bold;
  background: ${lighter_cyan};
  box-shadow: ${boxShadow(lighter_cyan)};
  padding: calc(0.1em) 0 0.15em 0;
  transition: all 0.1s linear;
  &:hover {
    background: ${cyan};
    box-shadow: ${boxShadow(cyan)};
  }
`

export default function Posts(props) {
  let posts = props.data.allMarkdownRemark.edges
  return <div />
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
            report_strip {
              publicURL
            }
          }
        }
      }
    }
  }
`
