import axios from 'axios'

export const REQUEST_POST_DATA = 'REQUEST_POST_DATA'
export const RECEIVE_POST_DATA = 'RECEIVE_POST_DATA'

const API_GET_POST_DATA = 'https://hacker-news.firebaseio.com/v0/item/'

function getPostDataUrl(postId) {
  return API_GET_POST_DATA + postId + '.json'
}

function requestPost(postId) {
  return {
    type : REQUEST_POST_DATA,
    postId
  }
}

function receivePost(postId, data) {
  return {
    type : RECEIVE_POST_DATA,
    postId,
    data
  }
}

function fetchPost(postId) {
  return (dispatch) => {
    dispatch(requestPost(postId))

    return axios.get(getPostDataUrl(postId))
      .then((response) => {
          dispatch(receivePost(postId, response.data))
      })
  }
}

function shouldFetchPost(state, postId) {
  const { entities } = state.posts

  return !entities[postId];
}

export const fetchPostIfNeeded = (postId) => {
  return (dispatch, getState) => {
    if(shouldFetchPost(getState(), postId)) {
      return dispatch(fetchPost(postId))
    }
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_POST_DATA] : (state, action) => {
    return state
  },

  [RECEIVE_POST_DATA] : (state, action) => {
    let newState = { ...state }

    newState.entities[action.postId] = action.data

    return newState
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    entities : {}
}

export default function postsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
