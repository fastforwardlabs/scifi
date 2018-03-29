import React from 'react'
import styled, { keyframes } from 'styled-components'
import { lh, lh_raw, lh1, Relative, AbsStretch } from '../utils/style.js'

let ReportMarker = styled.div`
  position: absolute;
  left: ${lh(0.5)};
  top: -${lh1};
  width: ${lh(0.5)};
  height: ${lh1};
  margin-left: -${lh(0.25)};
  z-index: 9;
  opacity: 0;
  transition: opacity 0.2s linear;
`

function getFontSize(window_width) {
  let font_size = 22
  if (window_width < 320) {
    font_size = 18
  } else if (window_width < 740) {
    font_size = 18 + (22 - 18) * (window_width - 320) / (740 - 320)
  }
  return font_size
}

function getMaxOffset(window_width) {
  let current_width = Math.min(window_width, 740)
  let font_size = getFontSize(window_width)
  let full_image_width = lh_raw(8) * 5.3125 * font_size
  let max_offset = full_image_width - current_width
  return max_offset
}
function getTouchOffset(deltaX, mobile_offset, max_offset) {
  let set_offset = mobile_offset + deltaX
  if (set_offset > 0) {
    set_offset = 0
  } else if (set_offset < -max_offset) {
    set_offset = -max_offset
  }
  return set_offset
}

export default class TemplateWrapper extends React.Component {
  constructor() {
    super()
    this.state = {
      touch_mode: true,
      scroll_active: false,
      scroller: lh(0.25),
      mobile_offset: 0,
      offset: 0,
    }
  }
  componentDidMount() {
    let me = this
    if (window) {
      window.addEventListener('resize', () => {
        me.setState({ scrol_active: false, scroller: lh(0.25), offset: 0 })
      })
    }
  }
  render() {
    let me = this
    let report_strip = this.props.report_strip
    let frontmatter = this.props.frontmatter
    return (
      <Relative style={{ height: lh(8) }}>
        <ReportMarker
          style={{
            background: frontmatter.background,
            left: me.state.scroller,
            opacity: me.state.scroll_active ? 0.3 : 0,
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            backgroundSize: 'auto 100%',
            backgroundPosition: '0 0',
            backgroundColor: '#efefef',
            backgroundRepeat: 'repeat-x',
            cursor: 'ew-resize',
            backgroundImage: `url('${report_strip}')`,
            backgroundPosition: `${me.state.offset}px 0`,
            transition: 'background 0.01s linear',
          }}
          onTouchStart={e => {
            let mobile_start = e.targetTouches[0].pageX
            this.setState({ mobile_start: mobile_start, scroll_active: true })
            e.preventDefault()
          }}
          onTouchMove={e => {
            let panned = -(me.state.mobile_start - e.targetTouches[0].pageX)
            let window_width = window.innerWidth
            let max_offset = getMaxOffset(window_width)
            let new_offset = me.state.mobile_offset + panned
            if (new_offset < -max_offset) {
              new_offset = -max_offset
            } else if (new_offset > 0) {
              new_offset = 0
            }
            let font_size = getFontSize(window_width)
            let scroller_width = lh_raw(0.5) * font_size
            let current_width = Math.min(window_width, 740)
            let scroll_scale =
              -new_offset / max_offset * (current_width - scroller_width) +
              scroller_width / 2
            this.setState({ offset: new_offset, scroller: scroll_scale })
            e.preventDefault()
          }}
          onTouchEnd={e => {
            this.setState({
              mobile_offset: me.state.offset,
              scroll_active: false,
            })
            e.preventDefault()
          }}
          onMouseEnter={function() {
            me.setState({ scroll_active: true })
          }}
          onMouseLeave={function() {
            me.setState({ scroll_active: false })
          }}
          onMouseMove={function(e) {
            let window_width = window.innerWidth
            let font_size = 22
            if (window_width < 320) {
              font_size = 18
            } else if (window_width < 740) {
              font_size = 18 + (22 - 18) * (window_width - 320) / (740 - 320)
            }
            let current_width = Math.min(window_width, 740)
            let delta = e.pageX - (window.innerWidth - current_width) / 2
            let full_image_width = lh_raw(8) * 5.3125 * font_size
            let max_offset = full_image_width - current_width
            let set_offset
            // Snap to edge
            let bumper = font_size * lh_raw(1)
            if (delta < bumper) {
              set_offset = 0
            } else if (delta > current_width - bumper) {
              set_offset = max_offset
            } else {
              let rescale = (delta - bumper) / (current_width - bumper * 2)
              set_offset = rescale * max_offset
            }
            let scroller_width = lh_raw(0.5) * font_size
            let scroll_set
            if (delta < scroller_width) {
              scroll_set = scroller_width / 2
            } else if (delta > current_width - scroller_width) {
              scroll_set = current_width - scroller_width / 2
            } else {
              let scroll_scale =
                (delta - scroller_width / 2) / (current_width - scroller_width)
              scroll_set = scroll_scale * current_width
            }
            me.setState({
              scroller: `${scroll_set}px`,
              offset: -set_offset,
              scroll_active: true,
            })
          }}
        />
      </Relative>
    )
  }
}
