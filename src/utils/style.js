import styled from 'styled-components'
import chroma from 'chroma-js'
import Link from 'gatsby-link'

export let domain = 'https://scifi.fastforwardlabs.com'

export let line_height = 1.5

export let lh = multiple => line_height * multiple + 'rem'
export let lh_raw = multiple => line_height * multiple
export let lh05 = lh(0.5)
export let lh1 = lh(1)

export let breakpoint = '@media (max-width: 560px)'

export let colors = {
  cyan: '#00dcec',
}

let fsm = multiple => line_height * multiple / 1.19 + 'rem'
export let Text = styled.span`
  ${props => {
    return `
      ${props.bold ? 'font-weight: bold;' : ''}
      ${props.italic ? 'font-style: italic;' : ''}
      ${props.fsm ? `font-size: ${fsm(props.fsm)}; line-height: 1.19;` : ''}
      ${props.allcaps ? `text-transform: uppercase;` : ''}
      ${props.color ? `color: ${props.color}` : ''}
    `
  }};
`

export let Container = styled.div`
  position: relative;
  padding-top: ${lh1};
  padding-left: ${lh1};
  padding-right: ${lh1};
  ${breakpoint} {
    padding-left: ${lh(0.5)};
    padding-right: ${lh(0.5)};
  }
`

export let LinkBlock = styled(Link)`
  display: block;
  color: #222;
  text-decoration: none;
`

export let Indent = styled.div`
  padding-left: ${lh1};
  ${breakpoint} {
    padding-left: 0;
  }
`

export let WhiteHighlight = styled.span`
  padding: 0.16em 0;
  background: #fff;
  box-shadow: -${lh(0.25)} 0 0 #fff, ${lh(0.25)} 0 0 #fff;
`

export let Highlight = styled.span`
  ${props => {
    let highlight
    if (props.bg) {
      highlight = chroma(props.bg)
        .brighten(0.5)
        .hex()
    } else {
      highlight = chroma(colors.cyan)
        .brighten(0.5)
        .desaturate(0.8)
        .hex()
    }
    return `
    padding: ${props.is_title ? `0` : `0.16em 0;`}
    box-shadow: ${
      props.is_title
        ? `-${lh(0.5)} 0 0 ${highlight}, ${lh(0.5)} 0 0 ${highlight};`
        : `-${lh(0.25)} 0 0 ${highlight}, ${lh(0.25)} 0 0 ${highlight};`
    }
    background: ${highlight};
    transition: all 0.1s linear;`
  }};
`

export let SmallHighlight = styled.span`
  ${props => {
    let highlight
    if (props.bg) {
      highlight = chroma(props.bg)
        .brighten(0.5)
        .hex()
    } else {
      highlight = chroma(colors.cyan)
        .brighten(0.5)
        .desaturate(0.8)
        .hex()
    }
    return `
    padding: ${props.is_title ? `0` : `0.16em 0;`}
    box-shadow: ${
      props.is_title
        ? `-${lh(0.5)} 0 0 ${highlight}, ${lh(0.5)} 0 0 ${highlight};`
        : `-${lh(0.25)} 0 0 ${highlight}, ${lh(0.25)} 0 0 ${highlight};`
    }
    background: ${highlight};
    transition: all 0.1s linear;`
  }};
`

export let UnderlineInnerLink = styled.span`
  ${props => {
    let bg = chroma(props.bg)
      .brighten(0.5)
      .hex()
    return `
      padding-bottom: 0.15em;
      background-position: 0 0.95em;
      background-size: 1em 0.3em;
      background-repeat: repeat-x;
      background-image: linear-gradient(
        ${bg},
        ${bg}
      );
      transition: all 0.1s linear;
    `
  }};
`

export let HiddenUnderlineInnerLink = UnderlineInnerLink.extend`
  background-image: linear-gradient(transparent, transparent);
`

export let UnderlineLink = styled(Link)`
  ${props => {
    let light_bg, bg
    if (props.bg) {
      light_bg = chroma(props.bg)
        .brighten(0.5)
        .hex()
      bg = props.bg
    } else {
      light_bg = chroma(colors.cyan)
        .brighten(0.5)
        .desaturate(0.8)
        .hex()
      bg = colors.cyan
    }
    return `
      color: #222;
      text-decoration: none;
      padding-bottom: 0.15em;
      background-position: 0 0.95em;
      background-size: 1em 0.3em;
      background-repeat: repeat-x;
      background-image: linear-gradient(
        ${light_bg},
        ${light_bg}
      );
      transition: all 0.1s linear;
      &:hover {
        background-image: linear-gradient(
          ${bg},
          ${bg}
        );
      }
    `
  }};
`

export let FootnoteInline = styled.div`
  ${props => {
    let light_bg, bg
    if (props.bg) {
      light_bg = chroma(props.bg)
        .brighten(0.5)
        .hex()
      bg = props.bg
    } else {
      light_bg = chroma(colors.cyan)
        .brighten(0.5)
        .desaturate(0.8)
        .hex()
      bg = colors.cyan
    }
    return `
      .footnote_container {
        .footnote_trigger {
          padding: 0 4px;
          background: #fff;
          cursor: pointer;
          user-select: none;
          sup {
            top: -0.5em;
          }
          a {
            color: ${bg};
            font-weight: bold;
            text-decoration: none;
          }
          &:hover {
            text-decoration: underline;
          }
        }
        .footnote_content {
          display: none;
          .footnote-backref {
            color: ${bg};
            font-weight: bold;
            text-decoration: none;
          }
        }
        &.active {
         .footnote_content {
            display: block;
            font-size: 18px;
            margin: 0.75rem 0;
            .footnote_content_number {
              font-weight: bold;
              color: ${bg};
              &:hover {
                text-decoration: underline;
              }
            }
          }
        }
      }`
  }};
`

// There is probably a cleaner solution to this
export let ExternalUnderlineLink = styled.a`
  ${props => {
    let light_bg, bg
    if (props.bg) {
      light_bg = chroma(props.bg)
        .brighten(0.5)
        .hex()
      bg = props.bg
    } else {
      light_bg = chroma(colors.cyan)
        .brighten(0.5)
        .desaturate(0.8)
        .hex()
      bg = colors.cyan
    }
    return `
      color: #222;
      text-decoration: none;
      padding-bottom: 0.15em;
      background-position: 0 0.95em;
      background-size: 1em 0.3em;
      background-repeat: repeat-x;
      background-image: linear-gradient(
        ${light_bg},
        ${light_bg}
      );
      transition: all 0.1s linear;
      &:hover {
        background-image: linear-gradient(
          ${bg},
          ${bg}
        );
      }
    `
  }};
`

export let UnderlineLinkContainer = styled.div`
  a {
    ${props => {
      let light_bg, bg
      if (props.bg) {
        light_bg = chroma(props.bg)
          .brighten(0.5)
          .hex()
        bg = props.bg
      } else {
        light_bg = chroma(colors.cyan)
          .brighten(0.5)
          .desaturate(0.8)
          .hex()
        bg = colors.cyan
      }
      return `
        color: #222;
        text-decoration: none;
        padding-bottom: 0.15em;
        background-position: 0 0.95em;
        background-size: 1em 0.3em;
        background-repeat: repeat-x;
        background-image: linear-gradient(
          ${light_bg},
          ${light_bg}
        );
        transition: all 0.1s linear;
        &:hover {
          background-image: linear-gradient(
            ${bg},
            ${bg}
          );
        }
      `
    }};
  }
`

export let LinkSpacer = styled.span`
  display: inline-block;
  width: ${lh05};
`

export let HiddenHighlight = Highlight.extend`
  background: transparent;
  ${props =>
    `box-shadow: ${
      props.is_title
        ? `-${lh(0.5)} 0 0 transparent, ${lh(0.5)} 0 0 transparent;`
        : `-${lh(0.25)} 0 0 transparent, ${lh(0.25)} 0 0 transparent;`
    };`};
`

export let BottomBorder = styled.div`
  position: absolute;
  left: ${lh(0.75)};
  right: ${lh(0.75)};
  height: ${lh(0.5)};
  bottom: 0;
  ${props => {
    let light_bg = chroma(props.bg)
      .brighten(0.5)
      .hex()
    return `background: ${light_bg};`
  }};
  transition: all 0.1s linear;
  ${breakpoint} {
    left: -${lh(0.5)};
    right: -${lh(0.5)};
  }
`

export let Arrow = styled.div`
  font-weight: bold;
  position: absolute;
  right: -${lh(1)};
  bottom: 0;
  display: block;
  width: ${lh(1.25)};
  height: ${lh(1)};
  text-align: center;
  line-height: 1.3;
  ${props => {
    let light_bg = chroma(props.bg)
      .brighten(0.5)
      .hex()
    return `background: ${light_bg};`
  }};
  transition: all 0.1s linear;
`

export let HighlightParentLink = styled(Link)`
  display: block;
  color: #222;
  text-decoration: none;
  &:hover ${Highlight}, &:hover ${HiddenHighlight} {
    ${props => {
      let bg
      if (props.bg) {
        bg = props.bg
      } else {
        bg = colors.cyan
      }
      return `
      box-shadow: ${
        props.is_title
          ? `-${lh(0.5)} 0 0 ${bg}, ${lh(0.5)} 0 0 ${bg};`
          : `-${lh(0.25)} 0 0 ${bg}, ${lh(0.25)} 0 0 ${bg};`
      }
      background: ${bg};`
    }};
  }
  &:hover ${SmallHighlight} {
    ${props => {
      let bg
      if (props.bg) {
        bg = props.bg
      } else {
        bg = colors.cyan
      }
      return `
      box-shadow:  ${`-${lh(0.25)} 0 0 ${bg}, ${lh(0.25)} 0 0 ${bg};`}
      background: ${bg};`
    }};
  }
  &:hover ${BottomBorder} {
    ${props => `background: ${props.bg}`};
  }
  &:hover ${Arrow} {
    ${props => `background: ${props.bg}`};
  }
  &:hover ${UnderlineInnerLink}, &:hover ${HiddenUnderlineInnerLink} {
    ${props => {
      let bg
      if (props.bg) {
        bg = props.bg
      } else {
        bg = colors.cyan
      }
      return `background-image: linear-gradient(
        ${bg},
        ${bg}
      )`
    }};
  }
`

export let AbsStretch = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`

export let Relative = styled.div`
  position: relative;
`

export let WidthBreakout = styled.div`
  position: relative;
  margin-left: -${lh1};
  margin-right: -${lh1};
  ${breakpoint} {
    margin-left: -${lh05};
    margin-right: -${lh05};
  }
`

export let Topper = styled.div`
  position: relative;
  height: ${lh(1)};
  ${props => `background: ${props.bg};`};
`

export let Bottomer = Topper.extend`
  z-index: -1;
`

export let Seravek = styled.div`
  font-family: 'SeravekWebBasic', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
`

export let BareH1 = styled.h1`
  margin: 0;
  padding: 0;
  font-size: inherit;
  line-height: inherit;
  font-famiy: inherit;
`
export let BareH2 = styled.h2`
  margin: 0;
  padding: 0;
  font-size: inherit;
  line-height: inherit;
  font-famiy: inherit;
`
