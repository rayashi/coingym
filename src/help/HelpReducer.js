const INITIAL_STATE = {
  loading: false,
  agent: null
}

export default (state = INITIAL_STATE, action) => {
  if(action.type === 'loading_help'){
    return { ...state, loading: action.payload }
  }else if(action.type === 'set_agent'){
    return { ...state, agent: action.payload }
  }
  return state
}