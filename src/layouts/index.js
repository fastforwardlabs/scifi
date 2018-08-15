import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { withPrefix } from 'gatsby-link'
import Header from '../components/Header.js'
import StoryLinks from '../components/StoryLinks.js'
import About from '../components/About.js'
import { lh1, domain } from '../utils/style.js'
import { throttle } from 'lodash'

import './fonts.css'
import './index.css'
import './custom.css'

let PageContainer = styled.div`
  font-family: 'ChambersSansWeb',-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
  max-width: 740px;
  margin: 0 auto;
  color: #222;
  position: relative;
  padding-bottom ${lh1}
`

export default class TemplateWrapper extends React.Component {
  constructor(props) {
    super(props)
    // Mouse tracking was for hovering over story links, I abandoned this
    // approach but might return to it
    this.state = {
      x: 0,
      x: 0,
      scroll: 0,
    }
  }

  setMouse = throttle(e => {
    this.setState({ x: e.clientX, y: e.clientY, scroll: window.pageYOffset })
  }, 1)

  setScroll = throttle(() => {
    this.setState({ scroll: window.pageYOffset })
  }, 1)

  handleMouse(e) {
    e.persist()
    this.setMouse(e)
  }

  componentDidMount() {
    // window.addEventListener('scroll', this.setScroll, { passive: true })
  }

  render() {
    let { children, data, location } = this.props

    // check if report page
    let prefix_length = withPrefix('/').length - 1
    let report_page_check = location.pathname.substr(
      0 + prefix_length,
      3 + prefix_length
    )
    let report_page = null
    if ((report_page_check = '/ff')) {
      report_page = location.pathname.substr(
        1 + prefix_length,
        4 + prefix_length
      )
    }

    // filter current page from stories list
    let posts = data.allMarkdownRemark.edges
    if (report_page) {
      posts = posts.filter(({ node }) => {
        return node.frontmatter.report !== report_page
      })
    }

    let title = 'SciFi - Cloudera Fast Forward Labs'
    let description =
      'A collection of short fiction inspired by new developments in machine learning. Each story takes its theme from the topic of the report it appears in.'

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
              content: domain,
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
              content: domain + '/cffl-scifi.png',
            },
            {
              name: 'twitter:card',
              content: 'summary_large_image',
            },
            {
              name: 'twitter:site',
              content: '@fastforwardlabs',
            },
            {
              name: 'twitter:creator',
              content: '@fastforwardlabs',
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
              name: 'theme-color',
              content: '#00dcec',
            },
            {
              name: 'twitter:image',
              content: domain + '/cffl-scifi.png',
            },
          ]}
          link={[
            {
              rel: 'shortcut icon',
              type: 'image/png',
              href: withPrefix('/favicon.png'),
            },
          ]}
        />
        <PageContainer>
          <Header report_page={report_page} />
          <div>{children()}</div>
          <StoryLinks
            report_page={report_page}
            posts={posts}
            x={this.state.x}
            y={this.state.y}
            scroll={this.state.scroll}
          />
          <About report_page={report_page} />
        </PageContainer>
      </div>
    )
  }
}

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

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
            author
            author_link
            preview_image {
              publicURL
            }
          }
          excerpt(pruneLength: 250)
          fields {
            report_image {
              childImageSharp {
                sizes(maxWidth: 800) {
                  src
                  srcSet
                }
              }
            }
            prologue
          }
        }
      }
    }
  }
`
