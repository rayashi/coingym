import { Toast } from 'native-base'
import firebase from 'react-native-firebase'


export const placeOrder = (pair, nav, goto) => {
  return async dispatch => {
    dispatch({type: 'loading_order', payload: true}) 
    try{
      let ref = firebase.firestore().collection('orders')
      const user = firebase.auth().currentUser
      let order = {
        user: user.uid,
        pair: `${pair.buy.symbol}/${pair.paywith.symbol}`,
        type: 'buy',
        price: pair.price,
        amount: pair.buy.amount,
        status: 'executed'
      }
      let doc = await ref.add(order)
      
      nav.navigate(goto)

    }catch (err){
      console.log(err)
      Toast.show({
        text: 'Sorry, Error trying place your order', 
        type: 'danger',
        position: 'top',
        duration: 2500
      })
    }
    dispatch({type: 'loading_order', payload: false}) 
  }
}
