import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'posts',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const PostList = require('./containers/PostListContainer').default
      const listReducer = require('./modules/list').default
      const postsReducer = require('./modules/posts').default

      injectReducer(store, { key: 'list', reducer : listReducer })
      injectReducer(store, { key: 'posts', reducer : postsReducer })

      /*  Return getComponent   */
      cb(null, PostList)

    /* Webpack named bundle   */
  }, 'posts')
  }
})
