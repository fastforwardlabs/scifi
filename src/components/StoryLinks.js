import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import {
  lh,
  lh1,
  Text,
  Container,
  LinkBlock,
  Highlight,
  HighlightParentLink,
} from '../utils/style.js'
import StoryLink from './StoryLink.js'

export default ({ report_page, posts }) => {
  return (
    <Container>
      {report_page ? (
        <div>
          <Text italic>more stories</Text>
        </div>
      ) : null}
      {posts.map(({ node }) => (
        <StoryLink key={node.frontmatter.report} node={node} />
      ))}
    </Container>
  )
}
