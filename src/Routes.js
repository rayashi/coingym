import { AppRegistry } from 'react-native'
import { DrawerNavigator } from 'react-navigation'

import Intro from './intro/Intro'
import Deposit from './deposit/Deposit'
import Dashboard from './dashboard/Dashboard'
import CoinList from './coinlist/CoinList'

const drawerRoutes = {
  Intro: { screen: Intro },
  Deposit: { screen: Deposit },
  Dashboard: { screen: Dashboard },
  CoinList: { screen: CoinList }
}

export default Routes = DrawerNavigator(drawerRoutes,
  { 
    drawerBackgroundColor: 'rgba(0,0,0,0)'
  }
)