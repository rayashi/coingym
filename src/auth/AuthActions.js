import axios from 'axios'
import { Toast } from 'native-base'
import firebase from 'react-native-firebase'
import { AccessToken, LoginManager } from 'react-native-fbsdk'

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

export const setUsername = (value) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  return {
    type: 'set_username',
    payload: {username:value.toLowerCase(),valid:reg.test(value)}
  }
}

export const login = (username, password, nav, goTo) => {
  return async dispatch => {
    dispatch({type: 'loading_auth', payload: true}) 
    try{
      const user = await firebase.auth().signInAndRetrieveDataWithEmailAndPassword(username, password)
      console.log(user)
    }catch (err){
      Toast.show({
        text: 'This password is not correct', 
        type: 'danger',
        position: 'top',
        duration: 2500
      })
    }
    dispatch({type: 'loading_auth', payload: false}) 
  }
}

export const loginWithFacebook = (nav, goTo) => {
  return dispatch => {
    dispatch({type: 'loading_auth', payload: true})  
    LoginManager.logInWithReadPermissions(['public_profile', 'email'])
      .then( result => {
        if (!result.isCancelled) {
          AccessToken.getCurrentAccessToken()
            .then(data => {
              console.log(apiLoginWithFacebook(data.accessToken.toString()))
            })
        }else {
          dispatch({type: 'loading_auth', payload: false})  
        }
      }, error => { 
        dispatch({type: 'loading_auth', payload: false})  
        alert('Login failed with error: ' + error)
      })
  }
}