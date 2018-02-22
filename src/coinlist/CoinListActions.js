import axios from 'axios'


export const setLoading = (value) => {
  return {
    type: 'loading_reviews',
    payload: value
  }
}

export const getCoinsPrice = () => {
  return dispatch => {
    dispatch({ type: 'loading_coins_info', payload: true })
    let instance = axios.create({baseURL: 'https://api.coinmarketcap.com/v1/ticker/'})
    instance.get()
      .then(response => getCoinsInfo(response.data, dispatch))
      .catch(error => {
        dispatch({ type: 'error_coins_price'})
      })
  }
}

const getCoinsInfo = (prices, dispatch) => {
  dispatch({ type: 'loading_coins_info', payload: true })
  let instance = axios.create({baseURL: 'https://files.coinmarketcap.com/generated/search/quick_search.json'})
  instance.get()
    .then(response => processCoinsInfo(prices, response.data, dispatch))
    .catch(error => {
      dispatch({ type: 'error_coins_info'})
    })

}

const processCoinsInfo = (prices, infos, dispatch) => {
  prices.map(item => {
    let info = infos.find(function (obj) { return obj.slug === item.id })
    item.image = `https://files.coinmarketcap.com/static/img/coins/64x64/${info.id}.png`
  })
  dispatch({ type: 'success_coins_info', payload: prices})
}