import React from 'react'
import styled, { keyframes } from 'styled-components'
import { lh, lh_raw, AbsStretch } from '../utils/style.js'

let ReportPreview = AbsStretch.extend`
  background-size: auto calc(100% - ${lh(1)});
  background-position: 0 0;
  background-color: #efefef;
  background-repeat: repeat-x;
  cursor: ew-resize;
`

export default class TemplateWrapper extends React.Component {
  constructor() {
    super()
    this.state = {
      ref: 0,
      offset: 0,
    }
  }
  render() {
    let me = this
    let report_strip = this.props.report_strip
    return (
      <ReportPreview
        style={{
          height: lh(10),
          backgroundImage: `url('${report_strip}')`,
          backgroundPosition: `${me.state.offset} 0`,
          transition: 'background 0.01s linear',
        }}
        onMouseMove={function(e) {
          let window_width = window.innerWidth
          let font_size = window_width < 560 ? 18 : 20
          let current_width = Math.min(window_width, 680)
          let delta = e.pageX - (window.innerWidth - current_width) / 2
          let full_image_width = lh_raw(9) * 5.3125 * font_size
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
          me.setState({ offset: `-${set_offset}px` })
        }}
      />
    )
  }
}
