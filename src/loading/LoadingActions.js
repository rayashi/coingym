import firebase from 'react-native-firebase'

export const listeningAuthState = (nav) => {
  return async dispatch => {
    dispatch({type: 'set_loading', payload: true}) 
    let authSubscription = firebase.auth().onAuthStateChanged((currentUser) => {
      if(currentUser){
        dispatch({type: 'set_currentUser', payload: currentUser})  
        nav.navigate('Dashboard')
      }else {
        nav.navigate('Intro')
      }
      dispatch({type: 'set_loading', payload: false}) 
    })
    dispatch({type: 'set_authSubscription', payload: authSubscription})
  }
}