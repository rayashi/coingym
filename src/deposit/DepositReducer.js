const INITIAL_STATE = {
  value: 0,
}

export default (state = INITIAL_STATE, action) => {

  if(action.type === 'set_value'){
    console.log(action.payload)
    return { ...state, value: action.payload }
  }

  return state
}