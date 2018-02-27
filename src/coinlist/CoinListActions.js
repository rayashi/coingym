import axios from 'axios'


export const setLoading = (value) => {
  return {
    type: 'loading_reviews',
    payload: value
  }
}

export const getCoinsPrice = (paywith) => {
  return dispatch => {
    dispatch({ type: 'loading_coins_info', payload: true })
    let instance = axios.create({baseURL: 'https://api.coinmarketcap.com/v1/ticker/'})
    instance.get()
      .then(response => {
        getCoinsInfo(response.data, paywith, dispatch)
      })
      .catch(error => {
        dispatch({ type: 'error_coins_price'})
      })
  }
}

const getCoinsInfo = (prices, paywith, dispatch) => {
  dispatch({ type: 'loading_coins_info', payload: true })
  let instance = axios.create({baseURL: 'https://files.coinmarketcap.com/generated/search/quick_search.json'})
  instance.get()
    .then(response => processCoinsInfo(prices, response.data, paywith, dispatch))
    .catch(error => {
      dispatch({ type: 'error_coins_info'})
    })

}

const processCoinsInfo = (prices, infos, paywith, dispatch) => {
  let pairs = []
  prices.map(item => {
    let info = infos.find(function (obj) { return obj.slug === item.id })

    pair = {
      id: `${item.symbol}/${paywith.symbol}`,
      buy: {
        symbol: item.symbol, 
        name: item.name,
        image: `https://files.coinmarketcap.com/static/img/coins/64x64/${info.id}.png`
      },
      paywith,
      price: item.price_usd
    }
    pairs.push(pair)
  })
  dispatch({ type: 'set_pairs', payload: pairs})
  dispatch({ type: 'success_coins_info', payload: prices})
}