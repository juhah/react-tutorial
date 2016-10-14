import React from 'react'
import { Media, SpinnerIcon } from 'react-bootstrap'
import moment from 'moment'

function getTitle(props) {
  if(props.title) {
    let title = props.title

    if(props.url) {
      title = <a href={props.url}>{title}</a>
    }

    return (
      <Media.Heading>{title}</Media.Heading>
    )
  }
}

function getStoryInfo(props) {
  let parts = [];

  if(props.score) {
    parts.push(`${props.score} points`)
  }

  if(props.by) {
    parts.push(`by ${props.by}`)
  }

  if(props.time) {
    parts.push(moment.unix(props.time).fromNow() + ' ago')
  }

  return (
    <p>
    {parts.join(' ')}
    {" | "}
      <a href='#' onClick={(e) => (props.onClick(props, e))}>
        {props.descendants} comments
      </a>
    </p>
  )
}

function getText(props) {
  let doc = new DOMParser().parseFromString(props.text, "text/html");
  let text = doc.body.innerHTML;

  return (
    <div>
      <p dangerouslySetInnerHTML={{__html : text}}>
      </p>
      {getStoryInfo(props)}
    </div>
  )
}

function getInfo(props) {
  if(props.showInfo) {
    switch(props.type) {
      case 'story':
        return getStoryInfo(props)
      case 'comment':
        return getText(props)
    }
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
      {getTitle(props)}
      {getInfo(props)}
    </Media.Body>
  </Media>
)

Item.propTypes = {
}

export default Item
