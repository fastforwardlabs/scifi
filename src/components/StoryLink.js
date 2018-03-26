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
} from '../utils/style.js'

let desktop_height = lh(8)
let mobile_height = lh(8)

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
`

let PreviewStretch = AbsStretch.extend`
  background-size: auto 100%;
  background-position: right top;
  background-color: #fff;
  clip-path: polygon(101% 0, 101% 100%, 0 100%, 0% 100%);
`

const AnimateLink = HighlightParentLink.extend`
  min-height: ${lh(12)};
  &:hover .disabled {
    ${BookStretch} {
      animation: ${AnimateDown} 3.5s linear infinite;
    }
    ${PreviewStretch} {
      animation: ${AnimateUp} 3.5s linear infinite;
    }
  }
`

export default ({ node }) => {
  return (
    <AnimateLink
      to={node.frontmatter.path}
      is_title
      bg={node.frontmatter.background}
    >
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
                node.frontmatter.preview_image.childImageSharp.sizes.src
              }')`,
            }}
          />
        </ImageHolder>
      </WidthBreakout>
      <div>
        <Text italic>from</Text>{' '}
        <Text allcaps color={node.frontmatter.background} bold>
          {node.frontmatter.report}:
        </Text>{' '}
        <Text bold>{node.frontmatter.report_title}</Text>
      </div>
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
      <WidthBreakout>
        <Relative style={{ maxHeight: lh(2), overflowY: 'hidden' }}>
          <Container style={{ paddingTop: 0 }}>
            <Indent>
              <WhiteHighlight>
                <Text italic>{node.excerpt}</Text>
              </WhiteHighlight>
            </Indent>
          </Container>
        </Relative>
      </WidthBreakout>
      <Relative style={{ textAlign: 'right' }}>
        <UnderlineInnerLink bg={node.frontmatter.background}>
          <Text italic>...read story</Text>
        </UnderlineInnerLink>
      </Relative>
    </AnimateLink>
  )
}
