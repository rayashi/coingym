const INITIAL_STATE = {
  mycoins: [],
}

export default (state = INITIAL_STATE, action) => {

  if(action.type === 'add_coin'){
    return { ...state, mycoins: [...state.mycoins, action.payload] }
  }

  return state
}