import firebase from 'react-native-firebase'
import { signInAnonymously, signIn } from '../auth/AuthActions'

export const subscribeAuthChange = (nav, onAuthStateChanged) => {
  return async dispatch => {
    dispatch({
      type: 'set_loading',
      payload: true
    })

    dispatch({
      type: 'set_unsubscribe_auth_change',
      payload: firebase.auth().onAuthStateChanged(credential => {
        guideUser(credential, dispatch)
      })
    })
  }
}

export const guideUser = async (credential, dispatch) => {
  if (credential) {
    let funds = await firebase.firestore().collection(`users/${credential.uid}/funds`).get()
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
