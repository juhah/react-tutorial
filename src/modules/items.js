import axios from 'axios'

export const REQUEST_ITEM_IDS = 'REQUEST_ITEM_IDS'
export const RECEIVE_ITEM_IDS = 'RECEIVE_ITEM_IDS'
export const REQUEST_ITEMS = 'REQUEST_ITEMS'
export const RECEIVE_ITEMS = 'RECEIVE_ITEMS'

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

function requestStories(page, section) {
  return {
    type : REQUEST_ITEM_IDS,
    page,
    section
  }
}

function receiveStories(page, section, itemIds) {
  return {
    type : RECEIVE_ITEM_IDS,
    section,
    itemIds
  }
}

export function fetchStories(section, page = 1) {
  return (dispatch, getState) => {
    dispatch(requestStories(section, page))

    axios.get(API_URL + getApiUrlByItemType(section) + '.json')
      .then((response) => {
        let skim = response.data.slice((page - 1) * MAX_THREAD_NUMBER, MAX_THREAD_NUMBER * page); // reduce the page size

        dispatch(receiveStories(section, page, skim))
        dispatch(fetchItems(skim))
      })
  }
}

export function fetchItems(itemIds) {
  return (dispatch, getState) => {
    const { ids } = getState().items

    dispatch(requestItems())

    itemIds.map((itemId) => {
      axios.get(API_URL + `item/${itemId}.json`)
        .then((response) => {
          ids.set(itemId, response.data)

          if(ids.size === itemIds.length) {
            dispatch(receiveItems(ids))
          }
        })
    })
  }
}

function requestItems() {
  return {
    type : REQUEST_ITEMS
  }
}

function receiveItems(ids) {
  return {
    type : RECEIVE_ITEMS,
    ids
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_ITEM_IDS] : (state, action) => {
    return {
      ...state,
      loadingList : true,
      list : [],
      section : action.section
    }
  },

  [RECEIVE_ITEM_IDS] : (state, action) => {
    return {
      ...state,
      loadingList : false,
      list : action.itemIds
    }
  },

  [REQUEST_ITEMS] : (state, action) => {
    return {
      ...state,
      isLoading : true,
      text : 'Requesting new items'
    }
  },

  [RECEIVE_ITEMS] : (state, action) => {
    return {
      ...state,
      isLoading : false,
      ids : action.ids
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    isLoading : false,
    ids : new Map(),
    list : []
}

export default function itemsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
