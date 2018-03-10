import axios from 'axios'
import { Toast } from 'native-base'
import firebase from 'react-native-firebase'
import { AccessToken, LoginManager } from 'react-native-fbsdk'
import { GoogleSignin } from 'react-native-google-signin'

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
      const facebookCredential = firebase.auth.FacebookAuthProvider.credential(data.accessToken)
      const credential = await firebase.auth().signInAndRetrieveDataWithCredential(facebookCredential)
      saveCredential(dispatch, credential)
      nav.navigate(goTo)
    } catch(error) {
      Toast.show({
        text: error.toString(),
        type: 'danger',
        position: 'top',
        duration: 3000
      })
      console.log('Login using facebook failed with error: ' + error)
    }
    dispatch({type: 'loading_auth', payload: false})
  }
}

export const loginWithGoogle = (nav, goTo) => {
  return async dispatch => {
    dispatch({type: 'loading_auth', payload: true})
    try {
      await GoogleSignin.configure()
      const data = await GoogleSignin.signIn()
      const googleCredential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
      const credential = await firebase.auth().signInAndRetrieveDataWithCredential(googleCredential)
      saveCredential(dispatch, credential)
      nav.navigate(goTo)
    } catch (error) {
      Toast.show({
        text: error.toString(),
        type: 'danger',
        position: 'top',
        duration: 3000
      })
      console.log('Login using google failed with error: ' + error)
    }
    dispatch({type: 'loading_auth', payload: false})
  }
}

export const signInAnonymously = async (dispatch) => {
  let credential = await firebase.auth().signInAnonymouslyAndRetrieveData()
  saveCredential(dispatch, credential)
}

export const signIn = (credential, dispatch) => {
  dispatch({type: 'set_current_user', payload: credential})
}

const saveCredential = (dispatch, credential) => {
  dispatch({type: 'set_current_user', payload: credential})
  let userRef = firebase.firestore().collection('users').doc(`${credential.user.uid}`)
  userRef.set({
    displayName: credential.user.displayName,
    email: credential.user.email,
    photoURL: credential.user.photoURL,
  })
}
