import axios from 'axios'

export const REQUEST_POST_IDS = 'REQUEST_POST_IDS'
export const RECEIVE_POST_IDS = 'RECEIVE_POST_IDS'

const API_GET_POST_IDS = 'https://hacker-news.firebaseio.com/v0/topstories.json'

function requestPostIds() {
  return {
    type : REQUEST_POST_IDS
  }
}

function receivePostIds(ids) {
  return {
    type : RECEIVE_POST_IDS,
    ids
  }
}

function shouldFetchPostIds(state) {
  return state.list.ids.length === 0;
}

function fetchPostIds() {
  return (dispatch) => {
    dispatch(requestPostIds())

    return axios.get(API_GET_POST_IDS)
      .then((response) => {          
          dispatch(receivePostIds(response.data.slice(0, 10)))
      })
  }
}

export const fetchPostIdsIfNeeded = () => {
  return (dispatch, getState) => {
    if(shouldFetchPostIds(getState())) {
      return dispatch(fetchPostIds())
    }
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_POST_IDS] : (state, action) => {
    return { ...state, isFetching : true }
  },
  [RECEIVE_POST_IDS] : (state, action) => {
    return { isFetching : false, ids : action.ids }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    isFetching : false,
    ids : []
}

export default function listReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
