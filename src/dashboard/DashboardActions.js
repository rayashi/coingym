import axios from 'axios'
import firebase from 'react-native-firebase'

export const listeningFundsChanges = () => {
  return dispatch => {
    let user = firebase.auth().currentUser
    let fundRef = firebase.firestore().collection(`users/${user.uid}/funds`).orderBy('fiat')
    let subscription = fundRef.onSnapshot(snapshot => onFundsUpdate(snapshot, dispatch))
    dispatch({ type: 'set_fundsSubscription', payload: subscription })   
  }
}

const onFundsUpdate = (querySnapshot, dispatch) => {
  let funds = []
  dispatch({ type: 'set_funds', payload: funds }) 

  querySnapshot.forEach(async doc => { 
    let fund = {
      id: doc.id,
      ...doc.data(),
      ticker: null
    }
    if(!fund.fiat){
      try{
        let instance = axios.create({baseURL: `https://api.coinmarketcap.com/v1/ticker/${fund.name}/`})
        let result = await instance.get()
        if(result && result.data.length > 0){
          fund.ticker = result.data[0]
        }
      }catch(error) {
        console.log(`Error on ticker: ${fund.name}, error: ${error}`)
      }
    }
    dispatch({ type: 'add_fund', payload: fund })
  })
}
