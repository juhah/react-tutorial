import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { browserHistory } from 'react-router'

import { fetchItemIfNeeded } from '../../../modules/items'

import Item from '../../../components/Item/Item'

class ListItemContainer extends React.Component {
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
        <Item title="..." icon='loading' spinIcon />
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

    onClick(e) {
      e.preventDefault()

      browserHistory.push('/item/' + this.props.itemId)
    }

    renderItem() {
      const { rank, post } = this.props

      const comments = post.descendants || 0

      return (
          <Item
            title={post.title}
            icon='story'
            url={post.url}
            rank={rank}
            byLine={this.getByLine(post)}
            linkText={`${comments} comments`}
            onClick={this.onClick}
          />
        )
    }

    render() {
      const { post, ready } = this.props

      return (
        (!post || post.loading) ? this.renderSpinning() : this.renderItem()
      )
    }
}

ListItemContainer.propTypes = {
  itemId : React.PropTypes.number.isRequired
}


const mapDispatchToProps = (state, ownProps) => {
  const { ids } = state.items

  return {
    post : ids.get(ownProps.itemId)
  }
}

export default connect(mapDispatchToProps)(ListItemContainer)
