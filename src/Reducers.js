import { combineReducers } from 'redux'

import DepositReducer from './deposit/DepositReducer'
import DashboardReducer from './dashboard/DashboardReducer'
import CoinListReducer from './coinlist/CoinListReducer'
import AuthReducer from './auth/AuthReducer'
import LoadingReducer from './loading/LoadingReducer'
import OrderReducer from './order/OrderReducer'
import HelpReducer from './help/HelpReducer'

export default combineReducers({
  LoadingReducer: LoadingReducer,
  DepositReducer: DepositReducer,
  DashboardReducer: DashboardReducer,  
  CoinListReducer: CoinListReducer,
  AuthReducer: AuthReducer,
  OrderReducer: OrderReducer,
  HelpReducer: HelpReducer
})