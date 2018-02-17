import { combineReducers } from 'redux'

import DepositReducer from './deposit/DepositReducer'
import DashboardReducer from './dashboard/DashboardReducer'

export default reducers = combineReducers({
  DepositReducer: DepositReducer,
  DashboardReducer: DashboardReducer,  
})