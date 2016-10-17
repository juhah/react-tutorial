import axios from 'axios'

export const REQUEST_ITEM_IDS = 'REQUEST_ITEM_IDS'
export const RECEIVE_ITEM_IDS = 'RECEIVE_ITEM_IDS'
export const REQUEST_ITEM = 'REQUEST_ITEM'
export const RECEIVE_ITEM = 'RECEIVE_ITEM'
export const CHANGE_PAGE = 'CHANGE_PAGE'

const API_URL = 'https://hacker-news.firebaseio.com/v0/'
const MAX_THREAD_NUMBER = 30

function getApiUrlByItemType (type) {
	switch (type) {
		case 'ask':
			return 'askstories';
		case 'show':
			return 'showstories';
		case 'jobs':
			return 'jobstories';
		case 'newest':
			return 'newstories';
		case 'newcomments':
			return 'topstories';
		default:
			return 'topstories';
	}
}

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

    axios.get(API_URL + getApiUrlByItemType(section) + '.json')
      .then((response) => {
        let skim = response.data //.slice((page - 1) * MAX_THREAD_NUMBER, MAX_THREAD_NUMBER * page); // reduce the page size

        dispatch(receiveStories(section, page, skim))
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

    axios.get(API_URL + `item/${itemId}.json`)
      .then((response) => {
        dispatch(receiveItem(itemId, response.data))
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
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    isLoading : false,
    ids : new Map(),
    list : new Map(),
    pages : []
}

export default function itemsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
