import axios from 'axios'
import firebase from 'react-native-firebase'

const database = firebase.firestore()

export const cancelOrder = (fundToDelete) => {
  return async dispatch => {
    dispatch({ type: 'deleting_order', payload: true })
    await database.runTransaction(t => cancelOrderTransaction(t,fundToDelete, dispatch))
    dispatch({ type: 'deleting_order', payload: false })
  }
}

const cancelOrderTransaction = async (transaction, fundToDelete, dispatch) => {
  const user = firebase.auth().currentUser  
  const fundToDeleteRef = database.doc(`users/${user.uid}/funds/${fundToDelete.id}`)
  const orderRef = database.doc(`orders/${fundToDelete.order}`)
  const orderDoc = await transaction.get(orderRef)
  const order = orderDoc.data()
  const fundToDecrementRef = database.doc(`users/${user.uid}/funds/${order.action==='buy'?order.quote.id:order.base.id}`)
  const fundToDecrementDoc = await transaction.get(fundToDecrementRef)
  let amountInOrder = fundToDecrementDoc.data().amountInOrder
  amountInOrder -= order.action==='buy'? order.quote.placedAmount : order.base.placedAmount 
  const fundToDecrement = {...fundToDecrementDoc.data(), id:fundToDecrementDoc.id, amountInOrder}
  transaction.delete(fundToDeleteRef)
  transaction.delete(orderRef)
  transaction.update(fundToDecrementRef, { amountInOrder })
}

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