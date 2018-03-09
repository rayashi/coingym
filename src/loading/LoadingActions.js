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
      payload: firebase.auth().onAuthStateChanged(onAuthStateChanged)
    })
  }
}

export const guideUser = (user) => {
  return async dispatch => {
    if (user) {
      let funds = await firebase.firestore().collection(`users/${user.uid}/funds`).get()
      let userHasFunds = Boolean(funds.size)

      if (userHasFunds) {
        signIn(user, dispatch)
      } else {
        signInAnonymously(dispatch)
      }

    } else {
      signInAnonymously(dispatch)
    }

    dispatch({type: 'set_loading', payload: false})
  }
}
