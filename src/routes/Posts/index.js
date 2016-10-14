import { injectReducer } from '../../store/reducers'

export default (store) => ({
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const PostList = require('./containers/PostListContainer').default
      const itemsReducer = require('../../modules/items').default

      injectReducer(store, { key: 'items', reducer : itemsReducer })

      /*  Return getComponent   */
      cb(null, PostList)

    /* Webpack named bundle   */
  }, 'posts')
  }
})
