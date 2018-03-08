const INITIAL_STATE = {
  name: '',
  username: 'rayashi@gmail.com',
  password: '123456',
  loading: false,
  username_valid: true,
  name_valid: false,
  password_valid: true,
  currentUser: null
}

export default (state = INITIAL_STATE, action) => {
  if(action.type == 'loading_auth'){
    return {...state, loading: action.payload}
  }else if(action.type == 'set_username'){
    return {
      ...state, 
      username: action.payload.username,
      username_valid: action.payload.valid
    }
  }else if(action.type == 'set_password'){
    return {
      ...state, 
      password: action.payload.password,
      password_valid: action.payload.valid
    }
  }else if(action.type == 'set_name'){
    return {
      ...state, 
      name: action.payload.name,
      name_valid: action.payload.valid
    }
  }else if(action.type == 'set_currentUser'){
    return { ...state, currentUser: action.payload }
  }
  return state
}