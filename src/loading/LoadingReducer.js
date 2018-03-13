const INITIAL_STATE = {
  loading: true,
  unsubscribeAuthChange: null,
}

export default (state = INITIAL_STATE, action) => {
  if(action.type === 'set_loading'){
    return {...state, loading: action.payload}
  }else if(action.type === 'set_unsubscribe_auth_change'){
    return {...state, unsubscribeAuthChange: action.payload}
  }
  return state
}