import firebase from 'react-native-firebase'
import { signInAnonymously, signIn } from '../auth/AuthActions'

import { Alert } from 'react-native'

import NavigationService from '../NavigationService'

const auth = firebase.auth()
const database = firebase.firestore()
const messaging = firebase.messaging()

export const subscribeAuthChange = () => {
  return async dispatch => {
    dispatch({
      type: 'set_loading',
      payload: true
    })

    dispatch({
      type: 'set_unsubscribe_auth_change',
      payload: auth.onAuthStateChanged(credential => {
        _setupPushNotifications(credential)
        guideUser(credential, dispatch)
      })
    })
  }
}

export const guideUser = async (credential, dispatch) => {
  if (credential) {
    let funds = await database.collection(`users/${credential.uid}/funds`).get()
    let user = credential.user || credential._user

    user.hasFunds = Boolean(funds.size)

    if (user.hasFunds) {
      signIn(credential, dispatch)
    } else {
      signInAnonymously(dispatch)
    }

  } else {
    signInAnonymously(dispatch)
  }

  dispatch({type: 'set_loading', payload: false})
}

const _setupPushNotifications = async (credential) => {
  try {
    await messaging.requestPermissions()

    const token = await messaging.getToken()

    database.doc(`users/${credential.uid}`).update({ pushToken: token })

    messaging.onMessage((message) => {
      Alert.alert('Great News', message.fcm.body, [{
        text: 'OK',
        onPress: () => NavigationService.navigate('Dashboard')
      }],
      {
        cancelable: false
      })
    })
  } catch(e) {
    console.error(e)
  }
}
