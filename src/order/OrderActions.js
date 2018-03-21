import { Toast } from 'native-base'
import firebase from 'react-native-firebase'


export const placeOrder = (action, order, callback) => {
  return async dispatch => {
    dispatch({type: 'loading_order', payload: true})
    try{
      let ref = firebase.firestore().collection('orders')
      const user = firebase.auth().currentUser
      let data = {
        symbol: order.symbol,
        placedPrice: parseFloat(order.price),
        user: user.uid,
        action: action,
        createdAt: (new Date()).getTime(),
        status: 'pending',
        type: 'market',
        base: {
          id: order.base.id,
          name: order.base.name,
          image: order.base.image,
          precision: order.base.precision,
          placedAmount: Number(order.base.amount.toFixed(order.base.precision))
        },
        quote: {
          id: order.quote.id,
          name: order.quote.name,
          image: order.quote.image,
          precision: order.quote.precision,
          placedAmount: Number(order.quote.amount.toFixed(order.quote.precision))
        }
      }
      const orderDoc = await ref.add(data)
      incrementAmountInOrder(data)
      createPendingFund(orderDoc.id, data)
      callback()
    } catch (err) {
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

const createPendingFund = async (orderId, order) => {
  const fundRef = firebase.firestore().doc(`users/${order.user}/funds/${orderId}`)
  fundRef.set({
    id: order.base.id,
    order: orderId,
    name: order.base.name,
    precision: order.base.precision,
    image: order.base.image,
    amount: order.base.placedAmount,
    fiat: order.base.id === 'usd' ? true : false,
    pending: true,
    action: order.action,
  })
}

const incrementAmountInOrder = async order => {
  let fundId = null
  if(order.action === 'buy'){
    fundId = order.quote.id
  }else {
    fundId = order.base.id
  }
  let fundRef = firebase.firestore().doc(`users/${order.user}/funds/${fundId}`)
  let doc = await fundRef.get()
  if(doc.exists){
    let fund = doc.data()
    if(order.action === 'buy'){
      fund.amountInOrder = (fund.amountInOrder||0) + order.quote.placedAmount
    }else{
      fund.amountInOrder = (fund.amountInOrder||0) + order.base.placedAmount
    }
    fund.amountInOrder = Number(fund.amountInOrder.toFixed(fund.precision))
    fundRef.set(fund)
  }
}

export const setOrderAction = (value) => {
  return {type: 'set_order_action', payload: value}
}

export const initialOrderSetup = (funds, market) => {
  let fund = funds.find(f => f.id === market.quote.id)
  market.quote.amount = 0
  market.quote.maximumValue = fund.amount - (fund.amountInOrder||0)
  market.base.amount = 0
  market.base.maximumValue = (market.quote.maximumValue/market.price)
  market.base.maximumValue = market.base.maximumValue.toFixed(market.base.precision)
  market.base.maximumValue = parseFloat(market.base.maximumValue)
  market.base.step = market.base.maximumValue / 1000
  market.quote.step = market.quote.maximumValue / 1000
  return market
}
