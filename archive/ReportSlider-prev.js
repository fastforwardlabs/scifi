import styled from 'styled-components'
import chroma from 'chroma-js'
import Link from 'gatsby-link'

export let domain = '//scifi.fastforwardlabs.com'

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
  left: ${lh(1.25)};
  height: ${lh(2)};
  right: 0;
  bottom: ${lh(0)};
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
  &:hover ${BottomBorder} {
    ${props => `background: ${props.bg}`};
  }
  &:hover ${UnderlineInnerLink} {
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
  height: ${lh(2)};
  margin-bottom: -${lh1};
  ${props => `background: ${props.bg};`};
  &:after {
    content: ' ';
    position: absolute;
    top: ${lh1};
    left: ${lh05};
    right: ${lh05};
    background: #fff;
    height: ${lh1};
  }
  ${breakpoint} {
    &:after {
      left: ${lh(0.25)};
      right: ${lh(0.25)};
    }
  }
`

export let Bottomer = Topper.extend`
  z-index: -1;
  margin-bottom: 0;
  margin-top: -${lh(1)};
  &:after {
    top: auto;
    bottom: ${lh1};
  }
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

let max_offset = strip_width - current_width
let max_delta = current_width
let delta_percent
let delta_rescaled
if (delta > 0) {
  delta_percent = delta / (current_width - ref_x_offset)
  delta_rescaled = delta_percent * (max_offset - me.state.offset_x)
} else {
  delta_percent = delta / ref_x_offset
  delta_rescaled = delta_percent * me.state.offset_x
}
let new_offset_x = me.state.offset_x + delta_rescaled
let offset_percent = new_offset_x / max_offset
if (offset_percent < 0.05) {
  new_offset_x = 0
  if (delta < 0) {
    me.setState({
      ref_x: x,
      display_x: new_offset_x,
      offset_x: new_offset_x,
    })
  } else {
    me.setState({
      display_x: new_offset_x,
    })
  }
} else if (offset_percent > 0.95) {
  new_offset_x = max_offset
  if (delta > 0) {
    me.setState({
      ref_x: x,
      display_x: new_offset_x,
      offset_x: new_offset_x,
    })
  } else {
    me.setState({
      display_x: new_offset_x,
    })
  }
} else {
  let rescale_again = (offset_percent - 0.05) / 0.9
  console.log(rescale_again)
  new_offset_x = rescale_again * max_offset
  me.setState({
    display_x: new_offset_x,
  })
}

onMouseMove = {
  function(e) {
    var x = e.clientX
    let ref_x_element = me.state.ref_x - width_offset
    let strip_aspect = 5.3125
    let font_size = getFontSize(window_width)
    let strip_width = lh_raw(8) * font_size * strip_aspect
    let snap_zone = 40
    let delta = x - me.state.ref_x
    console.log(delta)
    if (delta > 0) {
      let domain = current_width - ref_x_element
      let delta_percent = delta / domain
      let range = strip_width + me.state.offset_x - current_width
      let new_offset = delta_percent * range - me.state.offset_x
      let unit = domain / range
      if (new_offset > range - snap_zone - me.state.offset_x) {
        new_offset = strip_width - current_width
      } else if (new_offset < snap_zone) {
        new_offset = -me.state.offset_x
      } else {
        // let domain_start = unit * snap_zone
        // let domain_end = domain - unit * snap_zone
        // let new_domain = domain_end - domain_start
        // let adj_delta_percent = (delta - domain_start) / new_domain
        // new_offset = adj_delta_percent * range - me.state.offset_x
      }
      me.setState({
        display_x: -new_offset,
      })
    } else {
      let domain = ref_x_element
      let delta_percent = 1 + delta / ref_x_element
      let range = -me.state.offset_x
      let new_offset = delta_percent * range
      let unit = domain / range
      me.setState({
        start_ref: unit * snap_zone,
      })
      if (new_offset > range - snap_zone) {
        new_offset = -me.state.offset_x
      } else if (new_offset < snap_zone) {
        new_offset = 0
      } else {
        // console.log('neg else')
        // let domain_start = unit * snap_zone
        // let domain_end = domain - unit * snap_zone
        // let new_domain = domain_end - domain_start
        // let adj_delta_percent = 1 + (delta + domain_start) / new_domain
        // new_offset = adj_delta_percent * range
      }
      me.setState({
        display_x: -new_offset,
      })
    }
  },
}
