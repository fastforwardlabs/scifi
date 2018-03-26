import React from 'react'
import chroma from 'chroma-js'
import Link from 'gatsby-link'
import styled from 'styled-components'
import logo from '../images/ff-logo-square.png'
import ReportInfo from '../components/ReportInfo.js'

let line_height = 20 * 1.45

let cyan = '#00dcec'

let dark_cyan = chroma('#00dcec')
  .darken(0.75)
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

const UnderlineCyanLink = styled.span`
  padding-bottom: 0.15em;
  background-position: 0 0.95em;
  background-size: 1em 0.3em;
  background-repeat: repeat-x;
  background-image: linear-gradient(${lighter_cyan}, ${lighter_cyan});
  transition: all 0.1s linear;
  &:hover {
    background-image: linear-gradient(${cyan}, ${cyan});
  }
`

const LinkSpacer = styled.span`
  display: inline-block;
  width: ${line_height / 2}px;
`

const WhiteBox = styled.div`
  background: #fff;
  padding: 0.15em 0;
  box-shadow: -${line_height / 4}px 0 0 #fff, ${line_height / 4}px 0 0 #fff;
`

export default class TemplateWrapper extends React.Component {
  constructor() {
    super()
    this.state = {
      ref: 0,
      offset: 0,
    }
  }
  render() {
    let data = this.props.data
    const markdownRemark = data.markdownRemark // data.markdownRemark holds our post data
    const { frontmatter, fields, html } = markdownRemark

    let background = frontmatter.background
    let light_background = chroma(background)
      .brighten(0.8)
      .hex()
    let lighter_background = chroma(background)
      .brighten(1.5)
      .hex()
    let lightest_background = chroma(background)
      .desaturate(2)
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

    const WhiteHighlight = styled.span`
      background: #fff;
      padding: 0.15em 0;
      box-shadow: -${line_height / 4}px 0 0 #fff, ${line_height / 4}px 0 0 #fff;
    `

    const UnderlineLink = styled.span`
      padding-bottom: 0.15em;
      background-position: 0 0.95em;
      background-size: 1em 0.3em;
      background-repeat: repeat-x;
      background-image: linear-gradient(
        ${light_background},
        ${light_background}
      );
      transition: all 0.1s linear;
    `

    const MetaStyle = styled.div`
      p {
        margin: 0;
      }
      a {
        padding-bottom: 0.15em;
        background-position: 0 0.95em;
        background-size: 1em 0.3em;
        background-repeat: repeat-x;
        background-image: linear-gradient(
          ${light_background},
          ${light_background}
        );
        color: #000;
        text-decoration: none;
        transition: all 0.1s linear;
        &:hover {
          background-image: linear-gradient(${background}, ${background});
        }
      }
    `
    const TitleDisplay = styled.div`
      background: white;
      box-shadow: -${line_height / 2}px 0 0 white,
        ${line_height / 2}px 0 0 white;
    `

    let me = this

    return (
      <div>
        <ReportInfo frontmatter={frontmatter} fields={fields} />
        <div
          style={{
            padding: line_height,
            paddingTop: 0,
            paddingBottom: 0,
            // bACound: '#efefef',
            position: 'relative',
          }}
        >
          <div
            onMouseEnter={function(e) {
              me.setState({ entered: e.pageX, start_offset: me.state.offset })
            }}
            onMouseMove={function(e) {
              let delta = e.pageX - me.state.entered
              let current_width = Math.min(window.innerWidth, 680)
              let image_width = 928
              let max_offset = image_width - current_width
              let new_offset =
                me.state.start_offset + delta * (max_offset / 150)
              if (new_offset > max_offset) {
                new_offset = max_offset
                me.setState({ entered: e.pageX, start_offset: max_offset })
              } else if (new_offset < 0) {
                new_offset = 0
                me.setState({ entered: e.pageX, start_offset: 0 })
              }
              me.setState({ offset: new_offset })
            }}
          >
            <div
              style={{
                position: 'relative',
                margin: `0 -${line_height}px`,
                padding: `0 ${line_height}px`,
              }}
            >
              <div>
                <span className="italic">from the report</span>
              </div>
              <div>
                <WhiteHighlight>
                  <span className="allcaps bold" style={{ color: background }}>
                    {frontmatter.report}:
                  </span>{' '}
                  <span className="bold">{frontmatter.report_title}</span>
                </WhiteHighlight>
              </div>
            </div>
            <div>
              <div />
            </div>
            <div
              style={{
                background: '#efefef',
                padding: `0 0 ${line_height}px`,
                margin: -line_height,
                marginTop: 0,
              }}
            >
              <div
                style={{
                  height: line_height * 7,
                  backgroundImage: `url('${fields.report_strip.publicURL}')`,
                  backgroundSize: `auto 100%`,
                  backgroundPosition: `-${me.state.offset}px 0px`,
                  backgroundRepeat: 'no-repeat',
                }}
              />
            </div>
            <div style={{ fontStyle: 'italic' }}>
              <WhiteHighlight>
                Nam placerat sodales rutrum. Proin condimentum, nisi ut aliquet
                placerat, metus diam blandit odio, ac venenatis augue diam eget
                diam.
              </WhiteHighlight>
            </div>
          </div>
        </div>
        <div>
          <div
            style={{
              padding: line_height,
              paddingBottom: 0,
              marginTop: line_height,
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                right: 0,
                background: background,
                height: line_height * 2,
                // clipPath: `polygon(0 0, 100% 0, 0 100%)`,
              }}
            />
            <TitleDisplay style={{ position: 'relative' }}>
              <span
                style={{
                  fontSize: line_height * 2 / 1.19,
                  lineHeight: 1.19,
                  fontWeight: 'bold',
                }}
              >
                {frontmatter.title}
              </span>
            </TitleDisplay>
          </div>
          <div
            style={{
              padding: `0 ${line_height}px 0 ${line_height * 2}px`,
              fontStyle: 'italic',
            }}
          >
            {frontmatter.author ? (
              <MetaStyle>
                {frontmatter.author_link ? (
                  <span>
                    by{' '}
                    <Link to={frontmatter.author_link}>
                      <span className="bold">{frontmatter.author}</span>
                    </Link>
                  </span>
                ) : (
                  <span className="bold">{frontmatter.author}</span>
                )}
              </MetaStyle>
            ) : null}
            {fields.prologue ? (
              <MetaStyle
                dangerouslySetInnerHTML={{ __html: fields.prologue }}
              />
            ) : null}
          </div>
          <div
            style={{
              padding: `${line_height}px ${line_height}px ${line_height * 1}px`,
              fontFamily: 'SeravekWebBasic',
              position: 'relative',
            }}
          >
            <div
              className="blog-post-content"
              style={{
                position: 'relative',
                background: 'white',
                zIndex: 2,
              }}
              dangerouslySetInnerHTML={{ __html: html }}
            />
            <div
              style={{
                position: 'absolute',
                zIndex: 1,
                left: 0,
                bottom: line_height,
                right: 0,
                background: background,
                height: line_height * 2,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: line_height * 0.75,
                  right: line_height * 0.75,
                  background: 'white',
                  height: `calc(${line_height}px + 0.15em)`,
                  bottom: `calc(${line_height}px - 0.15em)`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
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
      }
    }
  }
`
