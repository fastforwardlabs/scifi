import React from 'react'
import Link from 'gatsby-link'
import { Container, UnderlineLink, BareH1, Text } from '../utils/style.js'

const NotFoundPage = () => (
  <Container>
    <Text bold fsm={2}>
      <BareH1>Page not found</BareH1>
    </Text>
    <div>
      Try the <UnderlineLink to="/">index page</UnderlineLink>, or select a
      story below.
    </div>
  </Container>
)

export default NotFoundPage
