import axios from 'axios'
import { Toast } from 'native-base'

export const setPassword = (value) => {
  return {
    type: 'set_password',
    payload: {password: value, valid: value.length > 2}
  }
}

export const setName = (value) => {
  return {
    type: 'set_name',
    payload: {name: value, valid: value.split(' ').length > 1}
  }
}

export const login = (username, password, nav, goTo) => {
  return dispatch => {
    dispatch({type: 'loading_auth', payload: true}) 
  }
}