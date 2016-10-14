// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    isFetching : false,
    ids : []
}

export default function commentsReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
