import React from 'react'
import { Media } from 'react-bootstrap'

const Post = (props) => (
  <Media>
    <Media.Body>
      <Media.Heading>{props.title}</Media.Heading>
      <p>
        by <strong>{ props.by }</strong>
        {" | "}
        comments: {props.descendants}
      </p>
    </Media.Body>
  </Media>
)

Post.propTypes = {
  title : React.PropTypes.string.isRequired
  //text  : React.PropTypes.string.isRequired,
}

export default Post
