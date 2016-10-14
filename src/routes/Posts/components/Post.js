import React from 'react'
import { Media } from 'react-bootstrap'
import { Link } from 'react-router'

const Post = (props) => (
  <Media>
    <Media.Body>
      <Media.Heading>{props.title}</Media.Heading>
      <p>
        by <strong>{ props.by }</strong>
        {" | "}
        <Link to={`/posts/${props.id}`} activeClassName='route--active'>
          comments: {props.descendants}
        </Link>
      </p>
    </Media.Body>
  </Media>
)

Post.propTypes = {
  title : React.PropTypes.string.isRequired
  //text  : React.PropTypes.string.isRequired,
}

export default Post
