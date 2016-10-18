import React from 'react'
import { connect } from 'react-redux'
import { fetchItemIfNeeded } from '../../../modules/items'

import ItemContainer from '../../../containers/ItemContainer'
import ItemListContainer from '../../../containers/ItemListContainer'

class ItemViewContainer extends React.Component {
  componentDidMount() {
    const { dispatch, itemId } = this.props

    dispatch(fetchItemIfNeeded(itemId))
  }

  render() {
    const { dispatch, itemId, item } = this.props

    const itemIds = item && item.kids || []

    return (
      <div>
        <ItemContainer dispatch={dispatch} itemId={itemId} showText={true} />
        <hr />
        <ItemListContainer itemIds={itemIds} showText={true} />
      </div>
    )
  }
}

const mapDispatchToProps = (state, ownProps) => {
  const { params: { itemId } } = ownProps
  const { ids } = state.items
  const id = Number.parseInt(itemId)

  return {
    itemId : id,
    item   : ids.get(id)
  }
}

export default connect(mapDispatchToProps)(ItemViewContainer)
