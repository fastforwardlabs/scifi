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
import ReportSlider from './ReportSlider.js'

const AnimateReport = keyframes`
  from { background-position: 0 0; }
  to { background-position: -${lh_raw(8) * 5.155}rem 0; }
`

// let PreviewTrigger = styled.div`
// animation: ${AnimateReport} 8s linear infinite;
// animation-delay: 2s;
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
      <WidthBreakout style={{ height: lh(9) }}>
        <ReportSlider report_strip={fields.report_strip.publicURL} />
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
