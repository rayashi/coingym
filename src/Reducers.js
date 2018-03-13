import { combineReducers } from 'redux'

import DepositReducer from './deposit/DepositReducer'
import DashboardReducer from './dashboard/DashboardReducer'
import CoinListReducer from './coinlist/CoinListReducer'
import AuthReducer from './auth/AuthReducer'
import LoadingReducer from './loading/LoadingReducer'
import OrderReducer from './order/OrderReducer'

export default reducers = combineReducers({
  LoadingReducer: LoadingReducer,
  DepositReducer: DepositReducer,
  DashboardReducer: DashboardReducer,  
  CoinListReducer: CoinListReducer,
  AuthReducer: AuthReducer,
  OrderReducer: OrderReducer
})