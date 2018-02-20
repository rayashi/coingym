const INITIAL_STATE = {
  value: 10000,
}

export default (state = INITIAL_STATE, action) => {

  if(action.type === 'set_value'){
    return { ...state, value: action.payload }
  }

  return state
}