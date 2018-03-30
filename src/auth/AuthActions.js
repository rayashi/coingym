import { Toast } from 'native-base'
import firebase from 'react-native-firebase'
import { AccessToken, LoginManager } from 'react-native-fbsdk'
import { GoogleSignin } from 'react-native-google-signin'
import Appsee from 'react-native-appsee'

const auth = firebase.auth()
const database = firebase.firestore()

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
  let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  return {
    type: 'set_username',
    payload: {username:value.toLowerCase(),valid:reg.test(value)}
  }
}

export const login = (username, password, nav, goTo) => {
  return async dispatch => {
    dispatch({type: 'loading_auth', payload: true})
    try{
      await firebase.auth().signInAndRetrieveDataWithEmailAndPassword(username, password)
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
    await dispatch({type: 'set_redirect', payload: false})
    try {
      const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email'])

      if (result.isCancelled) {
        throw new Error('User cancelled request')
      }

      const data = await AccessToken.getCurrentAccessToken()
      if (!data) {
        throw new Error('Something went wrong obtaining the users access token')
      }

      const facebookCredential = firebase.auth.FacebookAuthProvider.credential(data.accessToken)
      let credential = null

      if (auth.currentUser) {
        try {
          credential = await auth.currentUser.linkAndRetrieveDataWithCredential(facebookCredential)
        } catch(error) {
          await deleteOldUserData(dispatch)

          credential = await firebase.auth().signInAndRetrieveDataWithCredential(facebookCredential)
        }
      } else {
        credential = await firebase.auth().signInAndRetrieveDataWithCredential(facebookCredential)
      }

      saveCredential(dispatch, credential)
      nav.navigate(goTo)
    } catch(error) {
      dispatch({type: 'loading_auth', payload: false})

      Toast.show({
        text: error.toString(),
        type: 'danger',
        position: 'top',
        duration: 3000
      })

      console.log('Login using facebook failed with error: ' + error)
    }
  }
}

export const loginWithGoogle = (nav, goTo) => {
  return async dispatch => {
    await dispatch({type: 'set_redirect', payload: false})

    try {
      await GoogleSignin.configure()
      const data = await GoogleSignin.signIn()
      const googleCredential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
      let credential = null

      if (auth.currentUser) {
        try {
          credential = await auth.currentUser.linkAndRetrieveDataWithCredential(googleCredential)
        } catch(error) {
          await deleteOldUserData(dispatch)
          credential = await firebase.auth().signInAndRetrieveDataWithCredential(googleCredential)
        }
      } else {
        credential = await firebase.auth().signInAndRetrieveDataWithCredential(googleCredential)
      }

      saveCredential(dispatch, credential)

      if (nav) nav.navigate(goTo)
    } catch (error) {
      dispatch({type: 'loading_auth', payload: false})

      Toast.show({
        text: error.toString(),
        type: 'danger',
        position: 'top',
        duration: 3000
      })

      console.log('Login using google failed with error: ' + error)
    }
  }
}

export const signInAnonymously = () => {
  return async dispatch => {
    dispatch({ type: 'set_redirect', payload: false })

    const credential = await firebase.auth().signInAnonymouslyAndRetrieveData()

    Appsee.setUserId(credential.user.uid)
  }
}

export const signIn = (credential, dispatch) => {
  if (!credential) credential = { user: { hasFund: false } }

  dispatch({ type: 'set_current_user', payload: credential })
}

const saveCredential = async (dispatch, credential) => {
  dispatch({ type: 'set_current_user', payload: credential })

  let userRef = firebase.firestore().collection('users').doc(`${credential.user.uid}`)

  await userRef.set({
    displayName: credential.additionalUserInfo.profile.name,
    email: credential.user.email,
    isAnonymous: credential.user.isAnonymous,
    link: credential.additionalUserInfo.profile.link,
    locate: credential.additionalUserInfo.profile.locale,
    picture: getUserPicture(credential)
  })

  Appsee.addEvent('Auth')
  Appsee.setUserId(credential.user.uid)
}

const getUserPicture = (credential) => {
  switch(credential.additionalUserInfo.providerId){
    case 'google.com':
      return credential.additionalUserInfo.profile.picture
    case 'facebook.com':
      return credential.additionalUserInfo.profile.picture.data.url
  }
}

const deleteOldUserData = async (dispatch) => {
  dispatch({type: 'loading_auth', payload: true})
  Toast.show({
    text: 'Welcome again! We found an account that you already own. All data will be recovered and replace the current',
    type: 'success',
    position: 'top',
    duration: 3500
  })
  const orders = await database.collection('orders').where('user','==',auth.currentUser.uid).get()
  await orders.forEach(async doc => await doc.ref.delete())
  const funds = await database.collection(`users/${auth.currentUser.uid}/funds`).get()
  await funds.forEach(async doc => await doc.ref.delete())
  await database.doc(`users/${auth.currentUser.uid}`).delete()
  await auth.currentUser.delete()
  dispatch({type: 'loading_auth', payload: true})
}
