import React from 'react'
import styled, { keyframes } from 'styled-components'
import { lh, lh_raw, lh1, Relative, AbsStretch } from '../utils/style.js'

let ReportMarker = styled.div`
  position: absolute;
  left: ${lh(0.25)};
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

let delta_multiplier = 1

let animation

export default class TemplateWrapper extends React.Component {
  constructor() {
    super()
    this.state = {
      scroll_active: false,
      offset_x: 0,
      ref_x: 0,
      display_x: 0,
      start_ref: 0,
      max_offset: 0,
      window_width: 400,
      time_ref: 0,
    }
    this.setMyRef = element => {
      this.myRef = element
    }
  }

  componentDidMount() {
    let me = this
    if (window) {
      me.setState({ window_width: window.innerWidth })
      window.addEventListener('resize', () => {
        me.setState({
          scrol_active: false,
          scroller: lh(0.25),
          offset: 0,
          window_width: window.innerWidth,
        })
      })
    }
  }

  runAutoScroll(timestamp, amplitude) {
    let me = this
    let timeConstant = 200
    function autoScroll() {
      let elapsed = Date.now() - timestamp
      let delta = -amplitude * Math.exp(-elapsed / timeConstant)
      if (delta > 0.5 || delta < -0.5) {
        let new_offset = me.state.display_x - delta * 1
        if (new_offset > 0) {
          me.setState({ display_x: 0, offset_x: 0 })
          cancelAnimationFrame(animation)
        } else if (new_offset < -me.state.max_offset) {
          me.setState({
            display_x: -me.state.max_offset,
            offset_x: -me.state.max_offset,
          })
          cancelAnimationFrame(animation)
        } else {
          console.log('set state')
          console.log('offset', new_offset)
          me.setState({ display_x: new_offset })
          animation = requestAnimationFrame(autoScroll)
        }
      } else {
        me.setState({
          offset_x: me.state.display_x,
        })
      }
    }
    autoScroll()
  }

  getDir(x, y) {
    // getDir from https://tympanus.net/TipsTricks/DirectionAwareHoverEffect/
    let { offset_top, offset_left, width, height } = this.state
    let _x =
      (x - offset_left - width / 2) * (width > height ? height / width : 1)
    let _y =
      (y - offset_top - height / 2) * (height > width ? width / height : 1)
    // the angle and the direction from where the mouse came in/went out clockwise (TRBL=0123);
    // first calculate the angle of the point,
    // add 180 deg to get rid of the negative values
    // divide by 90 to get the quadrant
    // add 3 and do a modulo by 4  to shift the quadrants to a proper clockwise TRBL (top/right/bottom/left) **/
    let direction =
      Math.round((Math.atan2(_y, _x) * (180 / Math.PI) + 180) / 90 + 3) % 4
    return direction
  }

  initializeScroll(x, myRef) {
    let bounding = myRef.getBoundingClientRect()
    let offset_top = bounding.top + document.documentElement.scrollTop
    let offset_left = bounding.left
    let height = myRef.clientHeight
    let width = myRef.clientWidth
    this.setState({
      scroll_active: true,
      ref_x: x,
      offset_top: offset_top,
      height: height,
      offset_left: offset_left,
      width: width,
    })
  }

  render() {
    let me = this
    let report_strip = this.props.report_strip
    // let frontmatter = this.props.frontmatter
    // let window_width = 400
    // if (window) {
    //   window_width = window.innerWidth
    // }
    //
    //
    // let current_width = Math.min(window_width, 740)
    // let width_offset = window_width > 740 ? (window_width - 740) / 2 : 0
    //
    // let strip_aspect = 5.3125
    // let font_size = getFontSize(window_width)
    // let strip_width = lh_raw(8) * font_size * strip_aspect
    // let scroll_comp = -me.state.display_x / (strip_width - current_width)
    // let comp_scroller = scroll_comp * me.state.width
    //
    console.log('render', me.state.display_x)

    return (
      <Relative style={{ height: lh(8) }}>
        {/* <ReportMarker */}
        {/*   style={{ */}
        {/*     background: frontmatter.background, */}
        {/*     width: comp_scroller, */}
        {/*     opacity: me.state.scroll_active ? 0.2 : 0, */}
        {/*   }} */}
        {/* /> */}
        <div
          ref={this.setMyRef}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            backgroundSize: 'auto 100%',
            backgroundPosition: '0 0',
            backgroundColor: '#efefef',
            backgroundRepeat: 'no-repeat',
            cursor: 'ew-resize',
            backgroundImage: `url('${report_strip}')`,
            backgroundPosition: `${me.state.display_x}px 0`,
            transition: 'background 0.01s linear',
          }}
          onMouseEnter={function(e) {
            console.log('mouse enter')
            let x = e.clientX
            me.initializeScroll(x, me.myRef)
          }}
          onMouseLeave={function(e) {
            var x = e.clientX
            var y = e.clientY
            let direction = me.getDir(x, y)
            let strip_aspect = 5.3125
            let font_size = getFontSize(me.state.window_width)
            let strip_width = lh_raw(8) * font_size * strip_aspect
            // 1 is exit right
            // 3 is exit left
            let offset_x = me.state.display_x
            let display_x = me.state.display_x
            if (direction === 3) {
              offset_x = 0
              display_x = offset_x
            } else if (direction === 1) {
              offset_x = -(strip_width - me.state.width)
              display_x = offset_x
            }
            me.setState({
              offset_x: offset_x,
              display_x: display_x,
              scroll_active: false,
            })
          }}
          onMouseMove={function(e) {
            console.log('mouse move')
            var x = e.clientX
            if (!me.state.scroll_active) {
              me.initializeScroll(x, me.myRef)
            } else {
              let width_offset =
                me.state.window_width > 740
                  ? (me.state.window_width - 740) / 2
                  : 0
              let ref_x_element = me.state.ref_x - width_offset
              let strip_aspect = 5.3125
              let font_size = getFontSize(me.state.window_width)
              let strip_width = lh_raw(8) * font_size * strip_aspect
              let max_offset = strip_width - me.state.width
              let _x = x - width_offset
              let scroll_percent = _x / me.state.width
              let scroll_x =
                scroll_percent * (me.state.width - lh_raw(0.5) * font_size) +
                lh_raw(0.25) * font_size
              let delta = x - me.state.ref_x
              let current_width = Math.min(me.state.window_width, 740)
              if (delta > 0) {
                let domain = current_width - ref_x_element
                let delta_percent = delta / domain
                let range = strip_width + me.state.offset_x - current_width
                let new_offset = delta_percent * range - me.state.offset_x
                if (new_offset > strip_width - current_width - 10) {
                  new_offset = strip_width - current_width
                  me.setState({
                    ref_x: x,
                    offset_x: -new_offset,
                    display_x: -new_offset,
                  })
                } else {
                  me.setState({
                    display_x: -new_offset,
                  })
                }
              } else {
                let domain = ref_x_element
                let delta_percent = 1 + delta / ref_x_element
                let range = -me.state.offset_x
                let new_offset = delta_percent * range
                if (new_offset < 10) {
                  new_offset = 0
                  me.setState({
                    ref_x: x,
                    offset_x: -new_offset,
                    display_x: -new_offset,
                  })
                } else {
                  me.setState({
                    display_x: -new_offset,
                  })
                }
              }
            }
          }}
          onTouchStart={function(e) {
            let touch = e.touches[0]
            let strip_aspect = 5.3125
            let font_size = getFontSize(me.state.window_width)
            let strip_width = lh_raw(8) * font_size * strip_aspect
            let max_offset = strip_width - me.state.width
            console.log('touch start')
            cancelAnimationFrame(animation)
            me.setState({
              max_offset: max_offset,
              offset_x: me.state.display_x,
              time_ref: Date.now(),
              ref_x: touch.clientX,
            })
          }}
          onTouchMove={function(e) {
            console.log('touch move')
            let touch = e.touches[0]
            e.preventDefault()
            let x = touch.clientX
            let delta = x - me.state.ref_x
            let new_offset = delta + me.state.offset_x
            if (new_offset > 0) {
              me.setState({ display_x: 0, offset_x: 0 })
              cancelAnimationFrame(animation)
            } else if (new_offset < -me.state.max_offset) {
              me.setState({
                display_x: -me.state.max_offset,
                offset_x: -me.state.max_offset,
              })
              cancelAnimationFrame(animation)
            } else {
              me.setState({
                display_x: new_offset,
              })
            }
          }}
          onTouchEnd={function(e) {
            console.log('touch end')
            let now = Date.now()
            let t = now - me.state.time_ref
            let d = me.state.display_x - me.state.offset_x
            let velocity = d / t * 100
            console.log(velocity)
            if (velocity > 8 || velocity < -8) {
              let amplitude = 0.75 * velocity
              me.runAutoScroll(now, amplitude)
              // requestAnimationFrame(autoScroll);
            }
            me.setState({
              offset_x: me.state.display_x,
            })
          }}
        />
        {/* <div */}
        {/*   style={{ */}
        {/*     position: 'absolute', */}
        {/*     height: '100%', */}
        {/*     width: '2px', */}
        {/*     left: `${me.state.ref_x - width_offset}px`, */}
        {/*     marginLeft: '-1px', */}
        {/*     top: 0, */}
        {/*     background: 'red', */}
        {/*     pointerEvents: 'none', */}
        {/*   }} */}
        {/* /> */}
      </Relative>
    )
  }
}
