import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import {
  lh,
  lh1,
  breakpoint,
  colors,
  Text,
  Container,
  LinkBlock,
  HiddenHighlight,
  HighlightParentLink,
  BareH1,
} from '../utils/style.js'
import logo from '../images/ff-logo-square.png'

let Logo = styled.div`
  position: absolute;
  right: ${lh1};
  top: ${lh1};
  height: ${lh(2)};
  width: ${lh(2)};
  background-image: url(${logo});
  background-size: contain;
  ${breakpoint} {
    right: ${lh(0.5)};
  }
`

let Cffl = (
  <div>
    <Logo />
    <Text bold italic>
      Cloudera Fast Forward Labs
    </Text>
  </div>
)

let IndexPageMeta = (
  <div>
    {Cffl}
    <div>
      <BareH1>
        <Text bold fsm={3}>
          SciFi
        </Text>
      </BareH1>
    </div>
    <div>
      <Text>
        A collection of short fiction inspired by new developments in machine
        learning. Each story takes its theme from the topic of the report it
        appears in.
      </Text>
    </div>
  </div>
)

let ReportPageMeta = (
  <HighlightParentLink to="/">
    {Cffl}
    <div>
      <HiddenHighlight>
        <Text bold>SciFi</Text>
      </HiddenHighlight>
    </div>
  </HighlightParentLink>
)

export default ({ report_page }) => {
  return (
    <div>
      <Container>{report_page ? ReportPageMeta : IndexPageMeta}</Container>
    </div>
  )
}
