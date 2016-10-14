import { connect } from 'react-redux'
import React from 'react'
import FontAwesome from 'react-fontawesome';
import { browserHistory } from 'react-router'

import { fetchItemIfNeeded } from '../modules/items'
import Item from '../components/Item/Item'

class ItemContainer extends React.Component {
  componentDidMount() {
    const { postId, dispatch } = this.props

    dispatch(fetchItemIfNeeded(postId))
  }

  renderSpinning() {
    return (
      <Item title="..." showInfo={false} />
    )
  }

  renderItem() {
    const { rank, onClick, post } = this.props

    return (
      <Item showInfo={true} rank={rank} onClick={onClick} {...post} />
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
  postId : React.PropTypes.number.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const { ids } = state.items

  return {
    post : ids.get(ownProps.postId)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick : (props, e) => {
      e.preventDefault()
      browserHistory.push('/item/' + props.id)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemContainer)
