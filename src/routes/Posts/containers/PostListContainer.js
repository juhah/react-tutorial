import { connect } from 'react-redux'
import React from 'react'
import { fetchStoriesIfNeeded, changePage } from '../../../modules/items'
import { Pagination } from 'react-bootstrap'
import ItemContainer from '../../../containers/ItemContainer'
import ItemListContainer from '../../../containers/ItemListContainer'

const MAX_THREAD_NUMBER = 30

class PostListContainer extends React.Component {
  constructor(props) {
      super(props)

      this.handleSelect = this.handleSelect.bind(this)
  }

  componentDidMount() {
    const { dispatch, path } = this.props

    dispatch(fetchStoriesIfNeeded(path))
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, path } = nextProps

    if(this.props.path != path) {
      dispatch(fetchStoriesIfNeeded(path))
    }
  }

  getSpinning() {
    return (<div>
        Loading articles...
    </div>)
  }

  /*onClick(props, e) {
    e.preventDefault()
    browserHistory.push('/item/' + props.id)
  }*/

  handleSelect(eventKey) {
      const { path, dispatch } = this.props

      dispatch(changePage(path, eventKey))
  }

  render() {
    const { dispatch, loadingList, itemIds, page, numPages } = this.props

    let pagination
    if(itemIds.length > 0 && numPages > 1) {
        pagination = <Pagination
          items={numPages}
          prev
          next
          first
          last
          ellipsis
          maxButtons={10}
          boundaryLinks
          activePage={this.props.page}
          onSelect={this.handleSelect} />
    }

    return (
        <div style={{ margin: '0 auto' }} >
          { loadingList && this.getSpinning() }
          <ItemListContainer itemIds={itemIds} showText={false} showRank={true} showChildren={false} startRank={(page - 1) * MAX_THREAD_NUMBER}/>
          {pagination}
        </div>
    )
  }
}

PostListContainer.propTypes = {
  itemIds : React.PropTypes.array.isRequired,
}

const mapStateToProps = (state) => {
  let path = state.location.pathname.slice(1)
  let page = state.items.pages[path] || 1;
  let list = state.items.list.get(path)

  return {
    path,
    page,
    numPages : list && list.data ? Math.ceil(list.data.length / MAX_THREAD_NUMBER) : 1,
    loadingList : list && list.loading || false,
    itemIds : list && list.data && list.data.slice((page - 1) * MAX_THREAD_NUMBER, page * MAX_THREAD_NUMBER) || []
  }
}

export default connect(mapStateToProps)(PostListContainer)
