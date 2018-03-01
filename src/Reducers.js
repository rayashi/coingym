import { combineReducers } from 'redux'

import DepositReducer from './deposit/DepositReducer'
import DashboardReducer from './dashboard/DashboardReducer'
import CoinListReducer from './coinlist/CoinListReducer'
import AuthReducer from './auth/AuthReducer'

export default reducers = combineReducers({
  DepositReducer: DepositReducer,
  DashboardReducer: DashboardReducer,  
  CoinListReducer: CoinListReducer,
  AuthReducer: AuthReducer
})