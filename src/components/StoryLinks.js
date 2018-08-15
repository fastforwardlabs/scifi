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

export default ({ report_page, posts, x, y, scroll }) => {
  return (
    <Container>
      {report_page ? (
        <div>
          <Text italic>more stories</Text>
        </div>
      ) : null}
      {posts.map(({ node }, i) => (
        <StoryLink
          key={node.frontmatter.report}
          node={node}
          story_i={i}
          x={x}
          y={y}
          scroll={scroll}
        />
      ))}
    </Container>
  )
}
