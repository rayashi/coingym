import { AppRegistry } from 'react-native'
import { StackNavigator } from 'react-navigation'

import Intro from './intro/Intro'
import Deposit from './deposit/Deposit'
import Dashboard from './dashboard/Dashboard'
import CoinList from './coinlist/CoinList'
import Order from './order/Order'
import Auth from './auth/Auth'
import Loading from './loading/Loading'

const drawerRoutes = {
  Loading: { screen: Loading },
  Auth: { screen: Auth },
  Intro: { screen: Intro },
  Deposit: { screen: Deposit },
  Dashboard: { screen: Dashboard },
  CoinList: { screen: CoinList },
  Order: { screen: Order}
}

export default Routes = StackNavigator(drawerRoutes,
  {
    drawerBackgroundColor: 'rgba(0,0,0,0)'
  }
)
