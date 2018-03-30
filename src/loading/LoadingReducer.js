const INITIAL_STATE = {
  loading: true,
  unsubscribeAuthChange: null,
  redirect: true,
  config: null
}

export default (state = INITIAL_STATE, action) => {
  if(action.type === 'set_loading'){
    return {...state, loading: action.payload}
  }else if(action.type === 'set_unsubscribe_auth_change'){
    return {...state, unsubscribeAuthChange: action.payload}
  }else if(action.type === 'set_redirect'){
    return {...state, redirect: action.payload}
  }else if(action.type === 'set_config'){
    return {...state, config: action.payload}
  }
  return state
}