const INITIAL_STATE = {
  fundsSubscription: null,
  funds: []
}

export default (state = INITIAL_STATE, action) => {

  if(action.type === 'add_coin'){
    return { ...state, mycoins: [...state.mycoins, action.payload] }
  }else if(action.type === 'set_funds'){
    return { ...state, funds: action.payload }
  }else if(action.type === 'add_fund'){
    return { ...state, funds: [...state.funds, action.payload] }
  }

  return state
}