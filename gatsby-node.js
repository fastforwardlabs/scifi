/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path')
const commonmark = require('commonmark')
const removeMd = require('remove-markdown')

var reader = new commonmark.Parser()
var writer = new commonmark.HtmlRenderer()

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators

  const storyTemplate = path.resolve(`src/templates/storyTemplate.js`)

  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: storyTemplate,
        context: {}, // additional data can be passed via context
      })
    })
  })
}

// Add custom url pathname for blog posts.
exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators
  if (node.internal.type === `MarkdownRemark`) {
    let report_image = null
    let report_gif = null
    let report_strip = null
    if (node.frontmatter.report) {
      report_image = `./${node.frontmatter.report}-01.png`
      report_gif = `./${node.frontmatter.report}.gif`
      report_strip = `./${node.frontmatter.report}_strip.png`
    }
    createNodeField({
      node,
      name: `report_image`,
      value: report_image,
    })
    createNodeField({
      node,
      name: `report_gif`,
      value: report_gif,
    })
    createNodeField({
      node,
      name: `report_strip`,
      value: report_strip,
    })
    let prologue = null
    if (node.frontmatter.prologue) {
      prologue = writer.render(reader.parse(node.frontmatter.prologue))
    }
    createNodeField({
      node,
      name: `prologue`,
      value: prologue,
    })
    let report_sentence = null
    if (node.frontmatter.report_sentence) {
      report_sentence = writer.render(
        reader.parse(node.frontmatter.report_sentence)
      )
    }
    console.log(node.frontmatter.report_sentence)
    console.log(report_sentence)
    createNodeField({
      node,
      name: `report_sentence`,
      value: report_sentence,
    })
  }
}
