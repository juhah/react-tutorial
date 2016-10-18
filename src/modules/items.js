import axios from 'axios'

import {
  REQUEST_ITEM_IDS,
  RECEIVE_ITEM_IDS,
  REQUEST_ITEM,
  RECEIVE_ITEM,
  CHANGE_PAGE,
  COLLAPSE_ALL,
  TOGGLE_COMMENT,
} from '../actions/items/actions'

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_ITEM_IDS] : (state, action) => {
    const { list } = state

    list.set(action.section, {
      data : [],
      loading : true
    })

    return {
      ...state,
      section : action.section,
      loadingList : true,
      list
    }
  },

  [RECEIVE_ITEM_IDS] : (state, action) => {
    const { list } = state

    list.set(action.section, {
      data : action.itemIds,
      loading : false,
      updatedAt : Date.now()
    })

    return {
      ...state,
      list
    }
  },

  [REQUEST_ITEM] : (state, action) => {
    let newState = { ...state }

    newState.ids.set(action.itemId, { loading : true })

    return newState
  },

  [RECEIVE_ITEM] : (state, action) => {
    let newState = { ...state }

    newState.ids.set(action.itemId, { ...action.data, loading : false })

    return newState
  },

  [CHANGE_PAGE]: (state, action) => {
    let { pages } = state

    pages[action.section] = action.page

    return {
      ...state,
      pages
    }
  },

  [TOGGLE_COMMENT]: (state, action) => {
    let { comments } = state

    if(comments.has(action.itemId)) {
      comments.set(action.itemId, !comments.get(action.itemId))
    }
    else {
      comments.set(action.itemId, true)
    }

    return {
      ...state,
      comments
    }
  },

  [COLLAPSE_ALL]: (state, action) => {
    return {
      ...state,
      comments : new Map()
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    isLoading : false,
    ids       : new Map(),
    list      : new Map(),
    pages     : [],
    comments  : new Map()
}

export default function itemsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
