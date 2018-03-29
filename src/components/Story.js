import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
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
  Topper,
  Bottomer,
  UnderlineLink,
  ExternalUnderlineLink,
  UnderlineLinkContainer,
  Seravek,
  BareH1,
} from '../utils/style.js'

const NoParagraph = styled.div`
  p {
    margin: 0;
  }
`

export default ({ frontmatter, fields, html }) => {
  return (
    <Container>
      <WidthBreakout>
        <Topper bg={frontmatter.background} />
      </WidthBreakout>
      <Relative>
        <div>
          <BareH1>
            <Text bold fsm={2}>
              {frontmatter.title}
            </Text>
          </BareH1>
        </div>
        {frontmatter.author || fields.prologue ? (
          <div style={{ marginBottom: lh1 }}>
            {frontmatter.author ? (
              <Indent>
                <Text italic>
                  by{' '}
                  <Text bold>
                    {frontmatter.author_link ? (
                      <ExternalUnderlineLink
                        bg={frontmatter.background}
                        href={frontmatter.author_link}
                      >
                        {frontmatter.author}
                      </ExternalUnderlineLink>
                    ) : (
                      frontmatter.author
                    )}
                  </Text>
                </Text>
              </Indent>
            ) : null}
            {fields.prologue ? (
              <Indent>
                <NoParagraph>
                  <UnderlineLinkContainer
                    bg={frontmatter.background}
                    style={{ fontStyle: 'italic' }}
                    dangerouslySetInnerHTML={{ __html: fields.prologue }}
                  />
                </NoParagraph>
              </Indent>
            ) : null}
          </div>
        ) : null}
      </Relative>
      <Relative>
        <Seravek dangerouslySetInnerHTML={{ __html: html }} />
      </Relative>
      <WidthBreakout>
        <Bottomer bg={frontmatter.background} />
      </WidthBreakout>
    </Container>
  )
}
