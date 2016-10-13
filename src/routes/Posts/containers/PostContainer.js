import { connect } from 'react-redux'
import React from 'react'

import { fetchPostIfNeeded } from '../modules/posts'
import Post from '../components/Post'

class PostContainer extends React.Component {
  componentDidMount() {
    const { postId, dispatch } = this.props

    dispatch(fetchPostIfNeeded(postId))
  }

  renderSpinning() {
    return (
      <div>Loading</div>
    )
  }

  render() {
    const { post, fetching } = this.props

    return (
      fetching ? this.renderSpinning() : <Post key="{postId}" {...post} />
    )
  }
}

PostContainer.propTypes = {
  postId : React.PropTypes.number.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const { entities } = state.posts

  return {
    fetching : (typeof entities[ownProps.postId] === 'undefined'),
    post : entities[ownProps.postId]
  }
}

export default connect(mapStateToProps)(PostContainer)
