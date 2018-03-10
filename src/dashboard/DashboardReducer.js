const INITIAL_STATE = {
  unsubscribeFundsChange: null,
  funds: []
}

export default (state = INITIAL_STATE, action) => {
  if (action.type === 'set_funds') {
    return { ...state, funds: action.payload }
  } else if (action.type === 'add_fund') {
    return { ...state, funds: [...state.funds, action.payload] }
  }else if(action.type === 'set_unsubscribe_funds_change'){
    return { ...state, unsubscribeFundsChange: action.payload }
  }

  return state
}
