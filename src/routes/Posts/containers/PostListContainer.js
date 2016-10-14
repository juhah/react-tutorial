import { connect } from 'react-redux'
import React from 'react'
import { fetchStories } from '../../../modules/items'

import ItemContainer from '../../../containers/ItemContainer'

class PostListContainer extends React.Component {
  componentDidMount() {
    const { dispatch, path } = this.props

    dispatch(fetchStories(path.slice(1)))
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, path } = nextProps

    if(this.props.path != path) {
      dispatch(fetchStories(path.slice(1)))
    }
  }

  getSpinning() {
    return (<div>
        Loading articles...
    </div>)
  }

  render() {
    const { dispatch, loadingList, postIds } = this.props

    let posts = []
    let rank  = 0

    postIds.map((postId) => {
      posts = [...posts, <ItemContainer dispatch={dispatch} key={postId} postId={postId} rank={++rank} />]
    })

    return (
        <div style={{ margin: '0 auto' }} >
          { loadingList && this.getSpinning() }
          {posts}
        </div>
    )
  }
}

PostListContainer.propTypes = {
  postIds : React.PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
  path : state.location.pathname,
  loadingList : state.items.loadingList,
  postIds : state.items.list
})

export default connect(mapStateToProps)(PostListContainer)
