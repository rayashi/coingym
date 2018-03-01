const INITIAL_STATE = {
  token: null,
  name: '',
  username: '',
  password: '',
  error_login: false,
  userData: {},
  authenticated: false,
  loading: false,
  username_valid: false,
  name_valid: false,
  password_valid: false,
  pin: '',
  pin_valid: false,
  pin_created: false,
  loading_pin: false,
  validating_pin: false,
  changing_password: false
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
  }else if(action.type == 'success_login'){
    return {...state, token: action.payload ,error_login: false}
  }else if(action.type == 'error_login'){
    return {...state, error_login: true, loading: false}
  }else if(action.type == 'success_user_authenticated'){
    return {
      ...state, 
      userData: {...action.payload, token: state.token}, 
      error_login: false, 
      loading: false,
      authenticated: true
    }
  }else if(action.type == 'logout'){
    return {
      token: null,
      name: '',
      username: '',
      password: '',
      error_login: false,
      userData: {},
      authenticated: false,
      loading: false,
    }
  }else if(action.type == 'loading_pin'){
    return {...state, loading_pin: action.payload}  
  }else if(action.type == 'pin_valid'){
    return {...state, pin_valid: action.payload}  
  }else if(action.type == 'pin_created'){
    return {...state, pin_created: action.payload}  
  }else if(action.type == 'set_pin'){
    return {...state, pin: action.payload}  
  }else if(action.type == 'validating_pin'){
    return {...state, validating_pin: action.payload}  
  }else if(action.type == 'changing_password'){
    return {...state, changing_password: action.payload}  
  }else if(action.type == 'set_userdata_cliente'){
    return {...state, userData: {...state.userData, cliente: action.payload}}  
  }

  return state
}