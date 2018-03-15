const INITIAL_STATE = {
  loading: true,
  unsubscribeFundsChange: null,
  unsubscribeOrdersChange: null,
  funds: []
}

export default (state = INITIAL_STATE, action) => {
  if (action.type === 'set_loading_funds') {
    return { ...state, loading: action.payload }
  }else if (action.type === 'set_funds') {
    return { ...state, funds: action.payload }
  } else if (action.type === 'add_fund') {
    return { ...state, funds: [...state.funds, action.payload] }
  }else if(action.type === 'set_unsubscribe_funds_change'){
    return { ...state, unsubscribeFundsChange: action.payload }
  }else if(action.type === 'set_unsubscribe_orders_change'){
    return { ...state, unsubscribeOrdersChange: action.payload }
  }else if(action.type === 'update_fund'){
    let funds = state.funds.slice(0)
    const exists = funds.find(f=>f.id===action.payload.id)
    if(exists){
      funds
        .filter( fund => fund.id === action.payload.id )
        .map( fund => fund = action.payload )
    } else {
      funds.push(action.payload)
    }
    return {...state, funds: funds}
  }

  return state
}
