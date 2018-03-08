const INITIAL_STATE = {
  loading: false,
  currentUser: null
}

export default (state = INITIAL_STATE, action) => {
  if(action.type == 'loading_auth'){
    return { ...state, loading: action.payload }
  }else if(action.type == 'set_current_user'){
    return { ...state, currentUser: action.payload }
  }
  return state
}