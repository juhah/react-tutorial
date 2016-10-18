import React from 'react'
import { Media, SpinnerIcon } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

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

function getInnerHTML(props) {
  if(props.innerHTML) {
    let doc = new DOMParser().parseFromString(props.innerHTML, "text/html");
    let text = doc.body.innerHTML;

    return (
      <p dangerouslySetInnerHTML={{__html : text}}></p>
    )
  }
}

function getByLineAndLink(props) {
  if(props.byLine || props.link) {
    return (
      <p>
        {props.byLine}
        {props.byLine && props.link ? ' | ' : ''}
        {getLink(props)}
      </p>
    )
  }
}

function getLink(props) {
  if(props.link) {
    return (
      <a href={props.link.href(props)} onClick={props.onClick}>{props.link.text}</a>
    )
  }
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

function getIconForType(type) {
  switch (type) {
    case 'story':
      return 'newspaper-o'

    case 'job':
      return 'dollar'

    case 'comment':
      return 'comment-o'

      case 'comments':
        return 'comments-o'

    case 'loading':
      return 'spinner'

    default:
      return 'circle-o'
  }
}

function getIcon(props) {
  if(props.icon) {
    return (
      <Media.Left style={{'textAlign' : 'center'}}>
        <FontAwesome name={getIconForType(props.icon)} spin={props.spinIcon} style={{'fontSize' : '36px', 'color' : '#ddd', 'width' : '45px'}} />
      </Media.Left>
    )
  }
}

const Item = (props) => (
  <Media>
    {getIcon(props)}
    {getRank(props)}
    <Media.Body>
      {getTitle(props)}
      {getInnerHTML(props)}
      {getByLineAndLink(props)}
      {props.children}
    </Media.Body>
  </Media>
)

Item.propTypes = {
  icon      : React.PropTypes.string,
  spinIcon  : React.PropTypes.oneOfType([React.PropTypes.bool, React.PropTypes.node]),
  rank      : React.PropTypes.number,
  title     : React.PropTypes.string,
  url       : React.PropTypes.string,
  byLine    : React.PropTypes.string,
  innerHTML : React.PropTypes.string,
  link      : React.PropTypes.shape({
    href : React.PropTypes.func.isRequired,
    text : React.PropTypes.string
  }),
  onClick   : React.PropTypes.func
}

export default Item
