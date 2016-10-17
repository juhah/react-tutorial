import { connect } from 'react-redux'
import React from 'react'
import FontAwesome from 'react-fontawesome';

import { fetchItemIfNeeded } from '../modules/items'
import Item from '../components/Item/Item'

class ItemContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showComments : false
    }
  }

  componentDidMount() {
    const { postId, dispatch } = this.props

    dispatch(fetchItemIfNeeded(postId))
  }

  renderSpinning() {
    return (
      <Item title="..." loading={true} showInfo={false} />
    )
  }

onClick() {
  this.setState({
    showComments : !this.state.showComments
  })
}

  renderItem() {
    const { dispatch, showComments, rank, onClick, post } = this.props

    let kids = []

    if(showComments && post.kids && post.kids.length > 0) {
      kids = post.kids.map((id) => {
        return <ItemContainerWrapper dispatch={dispatch} showComments={this.state.showComments} onClick={this.onClick.bind(this)} key={id} postId={id} />
      })
    }

    return (
        <Item showInfo={true} rank={rank} onClick={onClick} {...post}>
          {kids}
        </Item>
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

const ItemContainerWrapper = connect(mapStateToProps)(ItemContainer)
export default ItemContainerWrapper
