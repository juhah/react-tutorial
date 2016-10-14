import { connect } from 'react-redux'
import React from 'react'

import { fetchPostIfNeeded } from '../modules/posts'
import Post from '../components/Post'

class PostContainer extends React.Component {
  componentDidMount() {
    const { postId, dispatch } = this.props
  }

  renderSpinning() {
    return (
      <div>Loading</div>
    )
  }

  render() {
    const { post, ready } = this.props

    return (
      (!post || post.loading) ? this.renderSpinning() : <Post key="{postId}" {...post} />
    )
  }
}

PostContainer.propTypes = {
  postId : React.PropTypes.number.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const { ids } = state.items

  return {
    post : ids.get(ownProps.postId)
  }
}

export default connect(mapStateToProps)(PostContainer)
