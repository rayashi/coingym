const INITIAL_STATE = {
  loading_order: false,
}

export default (state = INITIAL_STATE, action) => {

  if(action.type === 'loading_order'){
    return { ...state, loading_order: action.payload }
  }

  return state
}