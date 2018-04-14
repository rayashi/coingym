import axios from 'axios'
import firebase from 'react-native-firebase'

const PRICES_LIMIT = 300

export const setMarkets = (value) => {
  return {type: 'set_markets', payload: value}
}

export const getMarkets = (funds, fundToSell, payWith) => {
  return async dispatch => {
    dispatch({ type: 'loading_markets', payload: true })
    let markets = []
    let ref = firebase.firestore().collection('markets').orderBy('sort')
    if(fundToSell){
      ref = ref.where('base.id', '==', fundToSell.id)
    }
    if (payWith) {
      ref = ref.where('quote.id', '==', payWith.id)
    }
    let snapshot = await ref.get()
    snapshot.forEach(async doc => {
      markets.push({ ...doc.data(), id: doc.id, loadingPrice: true})
    })
    loadMarketPrices(markets, funds, fundToSell, dispatch)
  }
}

const loadMarketPrices = async (markets, funds, fundToSell, dispatch) => {
  const prices = listToObject(await getMarketPrices())
  if(!prices) return null
  markets.map( async market => { 
    market.base.ticker = getTicker(market.base.id, prices)
    market.quote.ticker = getTicker(market.quote.id, prices)
    market.price = calculateMarketPrice(market)
    market.available = getMarketAvailability(market, funds, fundToSell)
    market.loadingPrice = false
  })
  markets.filter( market => !market.price  )
  dispatch({ type: 'add_markets', payload: markets })
  dispatch({ type: 'loading_markets', payload: false })
}

const calculateMarketPrice = (market) => {
  if(!market.base.ticker || !market.quote.ticker) return 0
  let price = market.base.ticker.price_usd / market.quote.ticker.price_usd
  return Number(price.toFixed(market.quote.precision))
}

const getMarketAvailability = (market, funds, fundToSell) =>{
  if(fundToSell) return true
  let fund = funds.find(f => f.id === market.quote.id)
  if(fund && !fund.pending && (fund.amount - (fund.amountInOrder||0)) > 0) 
    return true
  return false
}

const getMarketPrices = async () => {
  let instance = axios.create({ baseURL: 'https://api.coinmarketcap.com/v1/ticker/' })
  try {
    return (await instance.get('/', {params: { limit: PRICES_LIMIT }})).data
  } catch (error) {
    return false
  }
}

const getTicker = (marketId, prices) => {
  if (marketId === 'usd') return { price_usd: 1 }
  return prices[marketId.toUpperCase()]
}

const listToObject = list => {
  let obj = {}
  list.map(x => { obj[x.symbol] = x })
  return obj
}