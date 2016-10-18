import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { browserHistory } from 'react-router'

import { fetchItemIfNeeded } from '../modules/items'

import Item from '../components/Item/Item'

class ItemContainer extends React.Component {
    constructor(props) {
        super(props)

        this.onClick = this.onClick.bind(this)
    }

    componentDidMount() {
      const { dispatch, itemId } = this.props

      dispatch(fetchItemIfNeeded(itemId))
    }

    renderSpinning() {
      return (
        <Item title="..." rank={this.props.rank} icon='loading' spinIcon />
      )
    }

    getByLine(post) {
      let parts = []

      if(post.score) {
        parts.push(`${post.score} points`)
      }

      if(post.by) {
        parts.push(`by ${post.by}`)
      }

      if(post.time) {
        parts.push(`${moment.unix(post.time).fromNow()} ago`)
      }

      return parts.join(" ")
    }

    getCommentCount(post) {
      if(post.type === 'story') {
        return post.descendants || 0
      }

      return post.kids && post.kids.length || 0
    }

    onClick(e) {
      e.preventDefault()

      browserHistory.push(e.target.getAttribute('href'))
    }

    renderItem() {
      const { rank, post, showText } = this.props

      const comments = this.getCommentCount(post)

      let itemProperties = {
        id     : post.id,
        title  : post.title,
        icon   : post.type,
        url    : post.url,
        rank   : rank,
        byLine : this.getByLine(post),
        innerHTML : showText && post.text,
        link   : {
          'href' : (props) => (`/item/${props.id}`),
          'text' : `${comments} comments`
        },
        onClick : this.onClick
      }

      return (
          <Item {...itemProperties} />
        )
    }

    render() {
      const { post, ready } = this.props

      return (
        (!post || post.loading) ? this.renderSpinning() : this.renderItem()
      )
    }
}

ItemContainer.propTypes = {
  itemId : React.PropTypes.number.isRequired
}

const mapDispatchToProps = (state, ownProps) => {
  const { ids } = state.items

  return {
    post : ids.get(ownProps.itemId)
  }
}

export default connect(mapDispatchToProps)(ItemContainer)
