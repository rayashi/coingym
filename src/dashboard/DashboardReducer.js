const INITIAL_STATE = {
  loading: true,
  deletingOrder: false,
  unsubscribeFundsChange: null,
  unsubscribeOrdersChange: null,
  funds: []
}

export default (state = INITIAL_STATE, action) => {
  if (action.type === 'set_loading_funds') {
    return { ...state, loading: action.payload }
  }else if (action.type === 'set_funds') {
    return { ...state, funds: action.payload }
  }else if (action.type === 'deleting_order') {
    return { ...state, deletingOrder: action.payload }
  }else if (action.type === 'add_fund') {
    return { ...state, funds: [...state.funds, action.payload] }
  }else if(action.type === 'set_unsubscribe_funds_change'){
    return { ...state, unsubscribeFundsChange: action.payload }
  }else if(action.type === 'set_unsubscribe_orders_change'){
    return { ...state, unsubscribeOrdersChange: action.payload }
  }else if(action.type === 'update_fund'){
    let funds = state.funds.slice(0)    
    if(funds.find(f=>f.id===action.payload.id)){
      funds = funds.map(f => f.id === action.payload.id ? action.payload : f)
    } else {
      funds.push(action.payload)
    }
    return {...state, funds: funds}
  }else if(action.type === 'delete_fund'){
    return {
      ...state, 
      funds: state.funds.filter(f=>f.id!==action.payload.id)
    }
  }

  return state
}
