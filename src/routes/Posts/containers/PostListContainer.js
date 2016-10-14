import { connect } from 'react-redux'
import React from 'react'
import { fetchStories } from '../../../modules/items'

import PostContainer from './PostContainer'

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
        Loading ...
    </div>)
  }

  render() {
    const { loadingList, postIds } = this.props

    return (
        <div style={{ margin: '0 auto' }} >
          { loadingList && this.getSpinning() }
          {postIds.map((postId) => (<PostContainer key={postId} postId={postId} />))}
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
