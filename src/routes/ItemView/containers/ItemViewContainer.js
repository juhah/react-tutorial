import React from 'react'
import { connect } from 'react-redux'

import ItemContainer from '../../../containers/ItemContainer'

class ItemViewContainer extends React.Component {
  componentDidMount() {
    const { dispatch, itemId } = this.props
  }

  render() {
    const { dispatch, itemId } = this.props

    return <ItemContainer dispatch={dispatch} showComments={true} postId={itemId} />
  }
}

const mapDispatchToProps = (state, ownProps) => {
  const { params: { itemId } } = ownProps

  return {
    itemId : Number.parseInt(itemId)
  }
}

export default connect(mapDispatchToProps)(ItemViewContainer)
