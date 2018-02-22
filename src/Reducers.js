import { combineReducers } from 'redux'

import DepositReducer from './deposit/DepositReducer'
import DashboardReducer from './dashboard/DashboardReducer'
import CoinListReducer from './coinlist/CoinListReducer'

export default reducers = combineReducers({
  DepositReducer: DepositReducer,
  DashboardReducer: DashboardReducer,  
  CoinListReducer: CoinListReducer
})