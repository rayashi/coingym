import { AppRegistry } from 'react-native'
import { StackNavigator } from 'react-navigation'

import Intro from './intro/Intro'
import Deposit from './deposit/Deposit'
import Dashboard from './dashboard/Dashboard'
import CoinList from './coinlist/CoinList'
import Order from './order/Order'
import Auth from './auth/Auth'

const drawerRoutes = {
  Intro: { screen: Intro },
  Deposit: { screen: Deposit },
  Dashboard: { screen: Dashboard },
  CoinList: { screen: CoinList },
  Order: { screen: Order},
  Auth: { screen: Auth },
}

export default Routes = StackNavigator(drawerRoutes,
  { 
    drawerBackgroundColor: 'rgba(0,0,0,0)'
  }
)