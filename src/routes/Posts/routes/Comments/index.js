import { injectReducer } from '../../../../store/reducers'

export default (store) => ({
  path : ':postId',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const PostList = require('./containers/CommentListContainer').default
      const commentsReducer = require('./modules/comments').default

      injectReducer(store, { key: 'comments', reducer : commentsReducer })

      /*  Return getComponent   */
      cb(null, PostList)

    /* Webpack named bundle   */
  }, 'posts')
  }
})
