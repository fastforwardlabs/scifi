import React from 'react'
import styled, { keyframes } from 'styled-components'
import {
  lh,
  lh_raw,
  breakpoint,
  Container,
  Text,
  UnderlineLink,
  ExternalUnderlineLink,
  LinkSpacer,
  WidthBreakout,
  AbsStretch,
  Relative,
  WhiteHighlight,
} from '../utils/style.js'

const AnimateReport = keyframes`
  from { background-position: 0 0; }
  to { background-position: -${lh_raw(8) * 5.155}rem 0; }
`

let ReportPreview = AbsStretch.extend`
  background-size: auto calc(100% - ${lh(1)});
  background-position: center 0;
  background-color: #efefef;
  background-repeat: repeat-x;
  animation: ${AnimateReport} 8s linear infinite;
`

// let PreviewTrigger = styled.div`
//   &:hover ${ReportPreview} {
//     animation: ${AnimateReport} 9s linear infinite;
//     animation-play-state: play;
//   }
// `

let NoParagraph = styled.span`
  p {
    display: inline;
    margin: 0;
  }
`

export default ({ frontmatter, fields }) => {
  return (
    <Container>
      <div>
        <Text italic>from the report</Text>
      </div>
      <div>
        <Text bold>
          <Text allcaps color={frontmatter.background}>
            {frontmatter.report}:
          </Text>{' '}
          {frontmatter.report_title}
        </Text>
      </div>
      <WidthBreakout style={{ height: lh(8) }}>
        <ReportPreview
          style={{
            height: lh(9),
            backgroundImage: `url('${fields.report_strip.publicURL}')`,
          }}
        />
      </WidthBreakout>
      <Relative>
        <WhiteHighlight>
          <Text italic>
            {fields.report_sentence ? (
              <NoParagraph
                dangerouslySetInnerHTML={{ __html: fields.report_sentence }}
              />
            ) : null}
            <ExternalUnderlineLink
              href="https://www.cloudera.com/more/services-and-support/fast-forward-labs.html"
              bg={frontmatter.background}
            >
              Learn more.
            </ExternalUnderlineLink>
          </Text>
        </WhiteHighlight>
      </Relative>
    </Container>
  )
}
