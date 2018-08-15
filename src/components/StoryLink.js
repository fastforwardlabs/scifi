import React from 'react'
import Link from 'gatsby-link'
import styled, { keyframes } from 'styled-components'
import {
  lh,
  lh05,
  lh1,
  breakpoint,
  Text,
  Container,
  LinkBlock,
  Highlight,
  SmallHighlight,
  WhiteHighlight,
  HighlightParentLink,
  UnderlineInnerLink,
  Indent,
  AbsStretch,
  Relative,
  WidthBreakout,
  BottomBorder,
  Arrow,
} from '../utils/style.js'

let desktop_num = 8
let mobile_num = 10
let desktop_height = lh(desktop_num)
let mobile_height = lh(mobile_num)
let desktop_ih = lh(desktop_num - 2)
let mobile_ih = lh(mobile_num - 2)

let TitleContainer = styled.div`
  height: ${desktop_height};
  ${breakpoint} {
    height: ${mobile_height};
  }
`

let ImageHolder = AbsStretch.extend`
  height: ${desktop_height};
  top: ${lh(2)};
  // top: 0;
  // height: 100%;
  ${breakpoint} {
    height: ${mobile_height};
  }
`

const AnimateDown = keyframes`
  from { background-position: 0 0; }
  to { background-position: 0 -${desktop_height}; }
`

const AnimateUp = keyframes`
  from { background-position: right 0; }
  to { background-position: right ${desktop_height}; }
`

let BookStretch = AbsStretch.extend`
  background-size: auto 100%;
  background-position: 0 0;
  background-color: #efefef;
  animation: ${AnimateDown} 2s linear infinite;
  animation-play-state: paused;
  ${breakpoint} {
    display: none;
  }
`

let PreviewStretch = AbsStretch.extend`
  background-size: auto 100%;
  background-position: 0 0;
  background-color: #fff;
  clip-path: polygon(101% 0, 101% 100%, 0% 100%);
  animation: ${AnimateUp} 2s linear infinite;
  animation-play-state: paused;
  ${breakpoint} {
    clip-path: none;
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
  }
`

const LinkIndicator = styled.div`
  position: absolute;
  bottom: 0;
  color: #222;
  font-weight: bold;
  opacity: 0;
  right: ${lh(1)}
  transition: all 0.1s linear
  ${breakpoint} {
    opacity: 1;
    right: ${lh(0.375)};
  }
`

const AnimateLink = HighlightParentLink.extend`
  position: relative;
  margin: 0 -${lh1} 0;
  padding: 0 ${lh1} ${lh(0.5)};
  ${breakpoint} {
    margin: 0 0 ${lh(0.5)};
    padding: 0 0 ${lh(0.5)};
  }
  &:hover {
    ${BookStretch} {
      animation-play-state: running;
    }
    ${PreviewStretch} {
      animation-play-state: running;
    }
  }
`
const ExcerptHolder = Relative.extend`
  max-height: ${lh(2)};
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

const Truncate = styled.div`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

function findAncestor(el, cls) {
  while ((el = el.parentElement) && !el.classList.contains(cls));
  return el
}

let delta_multiplier = 1

export default class TemplateWrapper extends React.Component {
  constructor() {
    super()
    this.state = {
      mouse_active: false,
      offset_x: 0,
      offset_y: 0,
      ref_x: 0,
      ref_y: 0,
      temp_x: 0,
      temp_y: 0,
      mobile_mode: false,
      rect: null,
      mounted: false,
    }
    this.onResize = this._onResize.bind(this)
  }

  checkBreakpoint() {
    if (window) {
      let window_width = window.innerWidth
      if (window_width < 560) {
        this.setState({ mobile_mode: true })
      } else {
        this.setState({ mobile_mode: false })
      }
    }
  }

  _onResize() {
    this.checkBreakpoint()
  }

  componentDidMount() {
    if (window) {
      this.checkBreakpoint()
      window.addEventListener('resize', this.onResize)

      let container_dom = document.querySelector(
        '#story-link-' + this.props.story_i
      )
      let rect = container_dom.getBoundingClientRect()
      this.setState({ rect, mounted: true })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }

  componentDidUpdate(prevProps, prevState) {
    // if (this.state.mounted) {
    //   let prev_y = prevProps.y + prevProps.scroll
    //   let y = this.props.y + this.props.scroll
    //   if (!isNaN(prev_y) && (prevProps.x !== this.props.x || prev_y !== y)) {
    //     if (this.state.rect) {
    //       let rect = this.state.rect
    //       if (y > rect.top && y < rect.top + rect.height) {
    //         let x = this.props.x
    //         if (this.state.mouse_active) {
    //           this.setState({
    //             temp_x: x,
    //             temp_y: y,
    //           })
    //         } else {
    //           this.setState({
    //             mouse_active: true,
    //             ref_x: x,
    //             ref_y: y,
    //             temp_x: x,
    //             temp_y: y,
    //           })
    //         }
    //       } else {
    //         this.setState({ mouse_active: false })
    //       }
    //     }
    //   }
    // }
  }

  render() {
    let me = this
    let node = this.props.node
    let new_offset_x =
      (me.state.temp_x - me.state.ref_x) * delta_multiplier + me.state.offset_x
    let raw_offset_y =
      (me.state.temp_y - me.state.ref_y) * delta_multiplier + me.state.offset_y
    let new_offset_y = raw_offset_y / 412.5 * 264
    return (
      <AnimateLink
        to={node.frontmatter.path}
        is_title
        bg={node.frontmatter.background}
        id={`story-link-${this.props.story_i}`}
        className="story-link"
      >
        {/* <BottomBorder bg={node.frontmatter.background} /> */}
        <ImageHolder>
          <BookStretch
            style={{
              backgroundImage: `url('${
                node.fields.report_image.childImageSharp.sizes.src
              }')`,
              backgroundPosition: `${-new_offset_x}px ${-new_offset_y}px`,
            }}
          />
          <PreviewStretch
            style={{
              backgroundImage: `url('${
                node.frontmatter.preview_image.publicURL
              }')`,
              backgroundPosition: this.state.mobile_mode
                ? 'center center'
                : `${-new_offset_x}px ${-new_offset_y}px`,
            }}
          />
        </ImageHolder>
        <Truncate style={{ position: 'relative' }}>
          <WhiteHighlight>
            <Text italic>from</Text>{' '}
            <Text allcaps color={node.frontmatter.background} bold>
              {node.frontmatter.report}:
            </Text>{' '}
            <Text bold>{node.frontmatter.report_title}</Text>
          </WhiteHighlight>
        </Truncate>
        <TitleContainer>
          <div style={{ position: 'relative', zIndex: 3 }}>
            <Text bold fsm={2}>
              <Highlight is_title bg={node.frontmatter.background}>
                {node.frontmatter.title}
              </Highlight>
            </Text>
          </div>
          {node.frontmatter.author ? (
            <div style={{ position: 'relative', zIndex: 1 }}>
              <Indent>
                <WhiteHighlight>
                  by{' '}
                  <Text bold italic>
                    {node.frontmatter.author}
                  </Text>
                </WhiteHighlight>
              </Indent>
            </div>
          ) : null}
        </TitleContainer>
        <WidthBreakout style={{ zIndex: 3, position: 'relative' }}>
          {/* <div */}
          {/*   style={{ */}
          {/*     height: '0.3rem', */}
          {/*     width: '100%', */}
          {/*     background: '#fff', */}
          {/*     position: 'absolute', */}
          {/*     bottom: '-0.3rem', */}
          {/*   }} */}
          {/* /> */}
          <ExcerptHolder>
            <Container style={{ paddingTop: 0 }}>
              <div>
                <WhiteHighlight>
                  <Text italic>{node.excerpt}</Text>
                </WhiteHighlight>
              </div>
            </Container>
          </ExcerptHolder>
        </WidthBreakout>
        <div
          style={{
            fontStyle: 'italic',
            position: 'relative',
            textAlign: 'right',
          }}
        >
          <UnderlineInnerLink bg={node.frontmatter.background}>
            read story
          </UnderlineInnerLink>
        </div>
        {/* <Relative style={{ zIndex: 4 }}> */}
        {/*   <Arrow bg={node.frontmatter.background}>→</Arrow> */}
        {/* </Relative> */}
        {/* <Relative style={{ zIndex: 2 }}> */}
        {/*   <WidthBreakout /> */}
        {/* </Relative> */}
      </AnimateLink>
    )
  }
}
