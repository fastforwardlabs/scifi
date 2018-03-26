import React from 'react'
import styled from 'styled-components'
import { Container, Text, UnderlineLink, ExternalUnderlineLink, LinkSpacer } from '../utils/style.js'

export default ({ report_page }) => {
  return (
    <Container>
      <div>
        <Text italic>about</Text>
      </div>
      <div>
        <Text italic>
          <Text bold>Cloudera Fast Forward Labs</Text> does applied machine
          learning research and consulting.
        </Text>
      </div>
      <div>
        {report_page ? <UnderlineLink to="/">Scifi</UnderlineLink> : 'Scifi'}
        <LinkSpacer> </LinkSpacer>
        <ExternalUnderlineLink href="https://www.cloudera.com/more/services-and-support/fast-forward-labs.html">Website</ExternalUnderlineLink>
        <LinkSpacer> </LinkSpacer>
        <ExternalUnderlineLink href="http://blog.fastforwardlabs.com/">Blog</ExternalUnderlineLink>
        <LinkSpacer> </LinkSpacer>
        <ExternalUnderlineLink href="http://twitter.com/fastforwardlabs">Twitter</ExternalUnderlineLink>
      </div>
    </Container>
  )
}
