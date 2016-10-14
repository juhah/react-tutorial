import { injectReducer } from '../../store/reducers'

import CommentsRoute from './routes/Comments'

export default (store) => ({
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
      const itemsReducer = require('../../modules/items').default

      injectReducer(store, { key: 'list', reducer : listReducer })
      injectReducer(store, { key: 'posts', reducer : postsReducer })
      injectReducer(store, { key: 'items', reducer : itemsReducer })

      /*  Return getComponent   */
      cb(null, PostList)

    /* Webpack named bundle   */
  }, 'posts')
  },

  childRoutes : [
    CommentsRoute(store)
  ]
})
