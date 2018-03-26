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
}
