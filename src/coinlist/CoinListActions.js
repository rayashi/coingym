import axios from 'axios'
import firebase from 'react-native-firebase'

export const setMarkets = (value) => {
  return {type: 'set_markets', payload: value}
}

export const getMarkets = (funds) => {
  return async dispatch => {
    dispatch({ type: 'loading_markets', payload: true })
    let markets = []
    let ref = firebase.firestore().collection('markets').orderBy('sort')
    let snapshot = await ref.get()
    snapshot.forEach(async doc => {
      markets.push({ ...doc.data(), id: doc.id, loadingPrice: true})
    })
    dispatch({ type: 'add_markets', payload: markets })
    dispatch({ type: 'loading_markets', payload: false })
    getMarketPrices(markets, funds, dispatch)
  }
}

const getMarketPrices = (markets, funds, dispatch) => {
  markets.map( async market => {
    market.base.ticker = { price_usd: 1 }
    market.quote.ticker = { price_usd: 1 }
    if(market.base.id !== 'usd'){
      try{
        let instance = axios.create({
          baseURL: `https://api.coinmarketcap.com/v1/ticker/${market.base.name}/`
        })
        let result = await instance.get()
        market.base.ticker = result.data[0]
      }catch(error) {
        console.log(`Error on ticker: ${market.base.name}, error: ${error}`)
      }
    }
    if(market.quote.id !== 'usd'){
      try{
        let instance = axios.create({
          baseURL: `https://api.coinmarketcap.com/v1/ticker/${market.quote.name}/`
        })
        let result = await instance.get()
        market.quote.ticker = result.data[0]
      }catch(error) {
        console.log(`Error on ticker: ${market.quote.name}, error: ${error}`)
      }
    }
    market.price = market.base.ticker.price_usd / market.quote.ticker.price_usd
    market.price = market.price.toFixed(market.quote.precision)
    market.loadingPrice = false
    market.available = getMarketAvailability(market, funds)
    dispatch({ type: 'update_market', payload: market })
  })
}

const getMarketAvailability = (market, funds) =>{
  let fund = funds.find(f => f.id === market.quote.id)
  if(fund && !fund.pending && (fund.amount - (fund.amountInOrder||0)) > 0) 
    return true
  return false
}