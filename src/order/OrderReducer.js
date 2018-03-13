const INITIAL_STATE = {
  order: null,
  loading: false,
}

export default (state = INITIAL_STATE, action) => {

  if(action.type === 'loading_order'){
    return { ...state, loading: action.payload }
  }else if(action.type === 'set_order_action'){
    return { 
      ...state, 
      order: { 
        ...state.order, 
        action: action.payload 
      }
    }
  }

  return state
}