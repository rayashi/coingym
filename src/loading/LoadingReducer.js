const INITIAL_STATE = {
  loading: true,
  authSubscription: null,
}

export default (state = INITIAL_STATE, action) => {
  if(action.type == 'set_loading'){
    return {...state, loading: action.payload}
  }else if(action.type == 'set_authSubscription'){
    return {...state, authSubscription: action.payload}
  }
  return state
}