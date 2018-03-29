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
  WhiteHighlight,
  HighlightParentLink,
  UnderlineInnerLink,
  Indent,
  AbsStretch,
  Relative,
  WidthBreakout,
  BottomBorder,
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
  animation: ${AnimateDown} 3.5s linear infinite;
  animation-play-state: paused;
`

let PreviewStretch = AbsStretch.extend`
  background-size: auto 100%;
  background-position: right top;
  background-color: #fff;
  clip-path: polygon(101% 0, 101% 100%, 0 100%);
  animation: ${AnimateUp} 3.5s linear infinite;
  animation-play-state: paused;
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
  padding-bottom: ${lh1};
  &:hover {
    ${BookStretch} {
      animation: ${AnimateDown} 3.5s linear infinite;
      animation-play-state: play;
    }
    ${PreviewStretch} {
      animation: ${AnimateUp} 3.5s linear infinite;
      animation-play-state: play;
    }
    ${LinkIndicator} {
      right: ${lh(0.5)};
      opacity: 1;
    }
  }
  ${breakpoint} {
    &:hover {
      ${BookStretch} {
        animation: none;
      }
      ${PreviewStretch} {
        animation: none;
      }
      ${LinkIndicator} {
        right: ${lh(0.375)};
      }
    }
  }
`
const ExcerptHolder = Relative.extend`
  max-height: ${lh(2)};
  overflow-y: hidden;
  padding-right: ${lh(0.75)};
  padding-left: ${lh(1)};
  ${breakpoint} {
    padding-left: 0;
    padding-right: ${lh(1)};
  }y
`

const Truncate = styled.div`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export default ({ node }) => {
  return (
    <AnimateLink
      to={node.frontmatter.path}
      is_title
      bg={node.frontmatter.background}
    >
      <BottomBorder bg={node.frontmatter.background} />
      <WidthBreakout>
        <ImageHolder>
          <BookStretch
            style={{
              backgroundImage: `url('${
                node.fields.report_image.childImageSharp.sizes.src
              }')`,
            }}
          />
          <PreviewStretch
            style={{
              backgroundImage: `url('${
                node.frontmatter.preview_image.publicURL
              }')`,
            }}
          />
        </ImageHolder>
      </WidthBreakout>
      <Truncate>
        <Text italic>from</Text>{' '}
        <Text allcaps color={node.frontmatter.background} bold>
          {node.frontmatter.report}:
        </Text>{' '}
        <Text bold>{node.frontmatter.report_title}</Text>
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
        <ExcerptHolder style={{}}>
          <Container style={{ paddingTop: 0 }}>
            <div
              style={{
                background: '#fff',
                boxShadow: `-${lh(0.25)} 0 0 #fff, ${lh(0.25)} 0 0 #fff`,
              }}
            >
              <WhiteHighlight>
                <Text italic>{node.excerpt}</Text>
              </WhiteHighlight>
            </div>
          </Container>
        </ExcerptHolder>
        <LinkIndicator>→</LinkIndicator>
      </WidthBreakout>
      <Relative style={{ zIndex: 2 }}>
        <WidthBreakout />
      </Relative>
    </AnimateLink>
  )
}
