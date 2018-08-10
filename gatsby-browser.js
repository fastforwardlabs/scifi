/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

exports.onRouteUpdate = ({ location }) => {
  if (typeof window !== `undefined`) {
    if (window) {
      window.scrollTo(0, 0)
    }
  }

  exports.shouldUpdateScroll = args => {
    //  scroll on < back, forward >, refresh, but not link clicks
    return args.prevRouterProps == null ||
      (args.prevRouterProps && args.prevRouterProps.history.action == 'POP')
      ? true
      : false
  }

  setTimeout(function() {
    let og_footnotes = document.querySelector('.footnotes')
    if (og_footnotes) {
      let footnotes = document.querySelectorAll('.footnotes ol li')
      for (let i = 0; i < footnotes.length; i++) {
        let f_content = footnotes[i]
        let link = f_content.querySelector('a')
        let href = link.getAttribute('href')
        let footnote = document.querySelector(href)
        let footnote_clone = footnote.cloneNode(true)
        let footnote_container = document.createElement('span')
        let footnote_trigger = document.createElement('span')
        footnote_trigger.className = 'footnote_trigger'
        footnote_trigger.appendChild(footnote_clone)
        footnote_container.className = 'footnote_container'
        let content_div = document.createElement('div')
        content_div.className = 'footnote_content'
        content_div.innerHTML =
          '<span class="footnote_content_number">' +
          (i + 1) +
          '.</span>' +
          ' ' +
          f_content.innerHTML.trim()
        footnote_container.appendChild(footnote_trigger)
        footnote_container.appendChild(content_div)
        footnote.parentNode.replaceChild(footnote_container, footnote)
        function toggleFootnote(footnote_container) {
          if (footnote_container.classList.contains('active')) {
            footnote_container.classList.remove('active')
          } else {
            footnote_container.classList.add('active')
          }
        }
        footnote_trigger.addEventListener(
          'click',
          toggleFootnote.bind(this, footnote_container),
          false
        )
        let footnote_backref = footnote_container.querySelector(
          '.footnote-backref'
        )
        footnote_backref.addEventListener(
          'click',
          toggleFootnote.bind(this, footnote_container),
          false
        )
      }
      og_footnotes.remove()
    }
  }, 0)
}
