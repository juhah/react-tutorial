import React from 'react'
import { Media, SpinnerIcon } from 'react-bootstrap'
import moment from 'moment'

function getTitle(props) {
  if(!props.url) {
    return props.title
  }

  return (
    <a href={props.url}>{props.title}</a>
  )
}

function getInfo(props) {

  if(props.showInfo) {
    return (
      <p>
      {props.score} points by { props.by } { moment.unix(props.time).fromNow() } ago
      {" | "}
        <a href='#' onClick={(e) => (props.onClick(props, e))}>
          {props.descendants} comments
        </a>
      </p>
    )
  }

  return (<p></p>)
}

function getRank(props) {
  if(props.rank) {
    return (
      <Media.Left>
        {props.rank}.
      </Media.Left>
    )
  }
}

const Item = (props) => (
  <Media>
    {getRank(props)}
    <Media.Body>
      <Media.Heading>{getTitle(props)}</Media.Heading>
      {getInfo(props)}
    </Media.Body>
  </Media>
)

Item.propTypes = {
  title : React.PropTypes.string.isRequired
  //text  : React.PropTypes.string.isRequired,
}

export default Item
