import { getStories, getItem } from '../../services/hackernews'
import {
  REQUEST_ITEM_IDS,
  RECEIVE_ITEM_IDS,
  REQUEST_ITEM,
  RECEIVE_ITEM,
  CHANGE_PAGE,
  COLLAPSE_ALL,
  TOGGLE_COMMENT,
} from './actions'

function requestStories(section, page) {
  return {
    type : REQUEST_ITEM_IDS,
    page,
    section
  }
}

function receiveStories(section, page, itemIds) {
  return {
    type : RECEIVE_ITEM_IDS,
    page,
    section,
    itemIds
  }
}

function shouldFetchStories(section, page, state) {
  const { list } = state.items
  const data = list.get(section)

  return !data || !data.loading && (Date.now() - data.updatedAt > 60000)
}

export function fetchStoriesIfNeeded(section, page = 1) {
  return (dispatch, getState) => {
    if(shouldFetchStories(section, page, getState())) {
      dispatch(fetchStories(section, page))
    }
  }
}

function fetchStories(section, page = 1) {
  return (dispatch, getState) => {
    dispatch(requestStories(section, page))

    getStories(section)
      .then((itemIds) => {
        dispatch(receiveStories(section, page, itemIds))
    })
  }
}

export function fetchItemsIfNeeded(itemIds) {
  return (dispatch) => {
    itemIds.map((itemId) => {
      dispatch(fetchItemIfNeeded(itemId))
    })
  }
}

export function fetchItemIfNeeded(itemId) {
  return (dispatch, getState) => {
      const { ids } = getState().items

      if(!ids.has(itemId)) {
        dispatch(fetchItem(itemId))
      }
  }
}

function fetchItem(itemId) {
  return (dispatch) => {
    dispatch(requestItem(itemId))

    getItem(itemId)
      .then((data) => {
        dispatch(receiveItem(itemId, data))
      })
  }
}

function requestItem(itemId) {
  return {
    type : REQUEST_ITEM,
    itemId
  }
}

function receiveItem(itemId, data) {
  return {
    type : RECEIVE_ITEM,
    itemId,
    data
  }
}

export function changePage(section, page) {
  return {
    type: CHANGE_PAGE,
    section,
    page
  }
}

export function toggleComment(itemId) {
  return {
    type : TOGGLE_COMMENT,
    itemId
  }
}

export function collapseAll() {
  return {
    type : COLLAPSE_ALL
  }
}
