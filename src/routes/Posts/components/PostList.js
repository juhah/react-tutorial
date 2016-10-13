import React from 'react'
import { Media } from 'react-bootstrap'

export const PostList = (props) => (
  <div style={{ margin: '0 auto' }} >
    <Media.Body>
      <Media.Heading>Media Heading</Media.Heading>
      <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
    </Media.Body>
  </div>
)

PostList.propTypes = {
//  counter     : React.PropTypes.number.isRequired,
//  doubleAsync : React.PropTypes.func.isRequired,
//  increment   : React.PropTypes.func.isRequired
}

export default PostList
