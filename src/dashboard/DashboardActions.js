import axios from 'axios'

export const addCoin = (value) => {
  return { type: 'add_coin', payload: value }
}

export const setFunds = (querySnapshot) => {
  return dispatch => {
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
}
