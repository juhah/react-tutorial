import { connect } from 'react-redux'
import React from 'react'
import { fetchPostIdsIfNeeded } from '../modules/list'

import PostContainer from './PostContainer'

class PostListContainer extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props

    dispatch(fetchPostIdsIfNeeded())
  }

  render() {
    const { postIds } = this.props

    return (
        <div style={{ margin: '0 auto' }} >
          {postIds.map((postId) => (<PostContainer key={postId} postId={postId} />))}
        </div>
    )
  }
}

PostListContainer.propTypes = {
  postIds : React.PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
  postIds : state.list.ids
})

export default connect(mapStateToProps)(PostListContainer)
