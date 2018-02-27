const INITIAL_STATE = {
  loading: false,
  coinsInfo: [],
  pairs:[]
}

export default (state = INITIAL_STATE, action) => {

  if(action.type === 'success_coins_info'){
    return {...state, coinsInfo: action.payload, loading: false}
  }else if(action.type === 'loading_coins_info'){
    return {...state, loading: action.payload}
  }else if(action.type === 'set_pairs'){
    return {...state, pairs: action.payload}
  }else if(action.type === 'error_coins_info'){
    return {...state, loading: false}
  }

  return state
}