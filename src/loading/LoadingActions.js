import firebase from 'react-native-firebase'

export const subscribeAuthChange = (nav) => {
  return async dispatch => {
    dispatch({type: 'set_loading', payload: true}) 
    let unsubscribe = firebase.auth().onAuthStateChanged((currentUser) => {
      if(currentUser){
        dispatch({type: 'set_current_user', payload: currentUser})  
        nav.navigate('Dashboard')
      }else {
        nav.navigate('Intro')
      }
      dispatch({type: 'set_loading', payload: false}) 
    })
    dispatch({type: 'set_unsubscribe_auth_change', payload: unsubscribe})
  }
}