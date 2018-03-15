import axios from 'axios'
import firebase from 'react-native-firebase'


export const subscribeFundsChange = () => {
  return dispatch => {
    const user = firebase.auth().currentUser
    const fundRef = firebase.firestore()
                      .collection(`users/${user.uid}/funds`)
                      .orderBy('fiat', 'desc')
                      .orderBy('pending')
    const unsubscribe = fundRef.onSnapshot(snapshot => onFundsUpdate(snapshot, dispatch))
    dispatch({ type: 'set_unsubscribe_funds_change', payload: unsubscribe })
  }
}

const onFundsUpdate = (querySnapshot, dispatch) => {
  dispatch({ type: 'set_loading_funds', payload: true })
  dispatch({ type: 'set_funds', payload: [] })
  let funds = []
  querySnapshot.forEach(doc => {
    funds.push({...doc.data(), id: doc.id})
  })
  dispatch({ type: 'set_funds', payload: funds })
  dispatch({ type: 'set_loading_funds', payload: false })
  updateFundPrices(funds, dispatch)
}

const updateFundPrices = (funds, dispatch) => {
  funds.map(async fund => {
    if(!fund.fiat && !fund.pending){
      try{
        let instance = axios.create({baseURL: `https://api.coinmarketcap.com/v1/ticker/${fund.name}/`})
        let result = await instance.get()
        if(result && result.data.length > 0){
          fund.percentChange24h = result.data[0].percent_change_24h
          fund.priceUsd = result.data[0].price_usd
          dispatch({ type: 'update_fund', payload: fund })
        }
      }catch(error) {
        console.log(`Error on coinmarketcap ticker: ${fund.name}, error: ${error}`)
      }
    }
  })
}