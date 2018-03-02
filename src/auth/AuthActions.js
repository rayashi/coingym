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
      nav.navigate(goTo)
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
  return async dispatch => {
    dispatch({type: 'loading_auth', payload: true})  
    try{
      const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email'])
      if (result.isCancelled) {
        throw new Error('User cancelled request')
      }
      const data = await AccessToken.getCurrentAccessToken()
      if (!data) {
        throw new Error('Something went wrong obtaining the users access token')
      }
      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken)
      const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential)
      nav.navigate(goTo)

    } catch(err) {
      alert('Login failed with error: ' + error)
    }
    dispatch({type: 'loading_auth', payload: false})  
  }
}