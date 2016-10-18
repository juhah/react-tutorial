import React from 'react'
import { connect } from 'react-redux'

import ItemContainer from './ItemContainer'

class ItemListContainer extends React.Component {
  render() {
    const { dispatch, itemIds, startRank, showText, showRank, showChildren } = this.props

    let posts = []
    let rank  = startRank || 0

    itemIds.map((itemId) => {
      posts = [...posts, <ItemContainer
        dispatch={dispatch}
        key={itemId}
        itemId={itemId}
        rank={++rank}
        showText={showText}
        showRank={showRank}
        showChildren={showChildren}
        />
      ]
    })

    return (
        <div style={{ margin: '0 auto' }} >
          {posts}
        </div>
    )
  }
}

ItemListContainer.propTypes = {
  itemIds      : React.PropTypes.array.isRequired,
  startRank    : React.PropTypes.number,
  showText     : React.PropTypes.bool,
  showRank     : React.PropTypes.bool,
  showChildren : React.PropTypes.bool
}

export default connect()(ItemListContainer)
