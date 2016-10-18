import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { browserHistory } from 'react-router'

import { fetchItemIfNeeded } from '../actions/items/actionCreators'

import Item from '../components/Item/Item'
import ItemListContainer from './ItemListContainer'

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

    getIconType(post) {
      if(post.type == 'comment') {
        return post.kids && post.kids.length > 0 ? 'comments' : 'comment'
      }

      return post.type
    }

    onClick(e) {
      e.preventDefault()

      const { onClick } = this.props

      if(onClick) {
        onClick(this.props, e)
      }
      else {
        browserHistory.push(e.target.getAttribute('href'))
      }
    }

    renderItem() {
      const { rank, post, showText, showRank, showChildren } = this.props

      const comments = this.getCommentCount(post)

      let itemProperties = {
        id     : post.id,
        title  : post.title,
        icon   : this.getIconType(post),
        url    : post.url,
        rank   : showRank ? rank : null,
        byLine : this.getByLine(post),
        innerHTML : showText ? post.text : null,
        link   : {
          'href' : (props) => (`/item/${props.id}`),
          'text' : `${comments} comments`
        },
        onClick : this.onClick
      }

      return (
          <Item {...itemProperties}>
            {showChildren && comments > 0 && this.renderChildren()}
          </Item>
        )
    }

    renderChildren() {
      const { post, onClick, showChildren } = this.props

      return <ItemListContainer
        itemIds={post.kids}
        showText={true}
        showRank={false}
        onClick={onClick}
        showChildren={showChildren}
        />
    }

    render() {
      const { post, ready } = this.props

      return (
        (!post || post.loading) ? this.renderSpinning() : this.renderItem()
      )
    }
}

ItemContainer.propTypes = {
  itemId       : React.PropTypes.number.isRequired,
  showText     : React.PropTypes.bool,
  showRank     : React.PropTypes.bool,
  showChildren : React.PropTypes.bool
}

const mapDispatchToProps = (state, ownProps) => {
  const { ids, comments } = state.items

  return {
    post : ids.get(ownProps.itemId),
    showChildren : ownProps.showChildren && comments.has(ownProps.itemId) && comments.get(ownProps.itemId) || false
  }
}

export default connect(mapDispatchToProps)(ItemContainer)
