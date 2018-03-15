const INITIAL_STATE = {
  loading: false,
  markets:[]
}

export default (state = INITIAL_STATE, action) => {
  if(action.type === 'loading_markets'){
    return {...state, loading: action.payload}
  }else if(action.type === 'set_markets'){
    return {...state, markets: action.payload}
  }else if(action.type === 'add_market'){
    return {...state, markets: [...state.markets, action.payload]}
  }else if(action.type === 'add_markets'){
    return {...state, markets: [...state.markets, ...action.payload]}
  }else if(action.type === 'update_market'){
    let markets = state.markets.slice(0)
    markets
      .filter( market => market.id === action.payload.id )
      .map( market => market = action.payload )
    return {...state, markets: markets}
  }

  return state
}