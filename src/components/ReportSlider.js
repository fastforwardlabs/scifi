import React from 'react'
import { lh, lh_raw, lh1, Relative, AbsStretch } from '../utils/style.js'

let animation

// from https://raw.githubusercontent.com/oliviertassinari/react-swipeable-views/82bcc19b409449bfabe3909d24de709a8d2c3995/packages/react-swipeable-views/src/SwipeableViews.js
function addEventListenerEnhanced(node, event, handler, options) {
  node.addEventListener(event, handler, options)
}

export default class TemplateWrapper extends React.Component {
  constructor() {
    super()
    this.state = {
      scroll_active: false,
      offset: 0,
      ref: 0,
      display: 0,
      c_width: 0,
      c_height: 0,
      c_left: 0,
      c_top: 0,
      image_width: 0,
    }
    this.setContainerRef = element => {
      this.containerRef = element
    }
    this.setImageRef = element => {
      this.imageRef = element
    }
  }

  runAutoScroll(timestamp, amplitude) {
    let me = this
    let timeConstant = 325
    function autoScroll() {
      let max_offset = me.state.image_width - me.state.c_width
      let elapsed = Date.now() - timestamp
      let delta = -amplitude * Math.exp(-elapsed / timeConstant)
      if (delta > 0.5 || delta < -0.5) {
        let new_offset = me.state.display - delta * 1
        if (new_offset > 0) {
          me.setState({ display: 0, offset: 0 })
          cancelAnimationFrame(animation)
        } else if (new_offset < -max_offset) {
          me.setState({
            display: -max_offset,
            offset: -max_offset,
          })
          cancelAnimationFrame(animation)
        } else {
          me.setState({ display: new_offset })
          animation = requestAnimationFrame(autoScroll)
        }
      } else {
        me.setState({
          offset: me.state.display,
        })
      }
    }
    autoScroll()
  }

  getDir(x, y) {
    // from https://tympanus.net/TipsTricks/DirectionAwareHoverEffect/
    let { c_top, c_left, c_width, c_height } = this.state
    let _x =
      (x - c_left - c_width / 2) * (c_width > c_height ? c_height / c_width : 1)
    let _y =
      (y - c_top - c_height / 2) * (c_height > c_width ? c_width / c_height : 1)
    let direction =
      Math.round((Math.atan2(_y, _x) * (180 / Math.PI) + 180) / 90 + 3) % 4
    return direction
  }

  setImageDimensions(image) {
    let image_width = image.clientWidth
    this.setState({
      image_width: image_width,
    })
  }

  setDimensions(container) {
    let bounding = container.getBoundingClientRect()
    let offset_top = bounding.top + document.documentElement.scrollTop
    let offset_left = bounding.left
    let height = container.clientHeight
    let width = container.clientWidth
    this.setState({
      window_width: window.innerWidth,
      c_width: width,
      c_height: height,
      c_left: offset_left,
      c_top: offset_top,
    })
  }

  initializeScroll(x, container) {
    this.setState({
      scroll_active: true,
      ref: x,
    })
  }

  handleTouchStart = e => {
    cancelAnimationFrame(animation)
    let touch = e.touches[0]
    let x = touch.clientX
    this.setState({
      offset: this.state.display,
      ref: x,
      time_ref: Date.now(),
    })
  }

  handleTouchMove = e => {
    let touch = e.touches[0]
    let x = touch.clientX
    let delta = x - this.state.ref
    let max_offset = this.state.image_width - this.state.c_width
    let new_offset = delta + this.state.offset
    if (new_offset > 0) {
      this.setState({ display: 0, offset: 0 })
      cancelAnimationFrame(animation)
    } else if (new_offset < -max_offset) {
      this.setState({
        display: -max_offset,
        offset_x: -max_offset,
      })
      cancelAnimationFrame(animation)
    } else {
      this.setState({
        display: new_offset,
      })
    }
  }

  handleTouchEnd = e => {
    let now = Date.now()
    let t = now - this.state.time_ref
    let d = this.state.display - this.state.offset
    let velocity = d / t * 100
    if (velocity > 8 || velocity < -8) {
      let amplitude = 0.5 * velocity
      this.runAutoScroll(now, amplitude)
    }
    this.setState({
      offset: this.state.display,
    })
  }

  componentDidMount() {
    if (window) {
      this.setDimensions(this.containerRef)
      window.addEventListener('resize', () => {
        this.setDimensions(this.containerRef)
        this.setImageRef(this.imageRef)
      })
    }
    addEventListenerEnhanced(
      this.containerRef,
      'touchstart',
      this.handleTouchStart,
      {
        passive: false,
      }
    )
    addEventListenerEnhanced(
      this.containerRef,
      'touchmove',
      this.handleTouchMove,
      {
        passive: false,
      }
    )
    addEventListenerEnhanced(
      this.containerRef,
      'touchend',
      this.handleTouchEnd,
      {
        passive: false,
      }
    )
  }

  render() {
    let report_strip = this.props.report_strip
    return (
      <div
        style={{
          height: lh(8),
          width: '100%',
          overflow: 'hidden',
          cursor: 'ew-resize',
        }}
        ref={this.setContainerRef}
        onMouseEnter={e => {
          let x = e.clientX
          this.initializeScroll(x, this.containerRef)
        }}
        onMouseMove={e => {
          let { ref, c_width, c_left, image_width, offset } = this.state
          let x = e.clientX
          let rel_x = x - c_left
          if (!this.state.scroll_active) {
            this.initializeScroll(x, this.containerRef)
          } else {
            let delta = x - ref
            let max_offset = image_width - c_width
            let new_offset
            if (delta > 0) {
              let domain = c_width - (ref - c_left)
              let delta_percent = delta / domain
              let range = max_offset + offset
              new_offset = delta_percent * range - offset
            } else {
              let domain = ref - c_left
              let delta_percent = 1 + delta / domain
              let range = -offset
              new_offset = delta_percent * range
            }
            if (
              (delta > 0 && new_offset > max_offset - 10) ||
              (delta < 0 && new_offset < 10)
            ) {
              // Snap to edge
              if (new_offset < 10) {
                new_offset = 0
              } else {
                new_offset = max_offset
              }
              this.setState({
                ref: x,
                offset: -new_offset,
                display: -new_offset,
              })
            } else {
              this.setState({
                display: -new_offset,
              })
            }
          }
        }}
        onMouseLeave={e => {
          let x = e.clientX
          let y = e.clientY
          let dir = this.getDir(x, y)
          // 1 is exit right
          // 3 is exit left
          let _offset = this.state.display
          let _display = this.state.display
          if (dir === 3) {
            _offset = 0
            _display = _offset
          } else if (dir === 1) {
            let max_offset = this.state.image_width - this.state.c_width
            _offset = -max_offset
            _display = _offset
          }
          this.setState({
            offset: _offset,
            display: _display,
            scroll_active: false,
          })
        }}
      >
        <img
          ref={this.setImageRef}
          style={{
            height: lh(8),
            width: 'auto',
            maxWidth: 'none',
            transform: `translate3d(${this.state.display}px, 0, 0)`,
          }}
          onLoad={() => {
            this.setImageDimensions(this.imageRef)
          }}
          src={report_strip}
        />
      </div>
    )
  }
}
