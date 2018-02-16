import { AppRegistry } from 'react-native'
import { DrawerNavigator } from 'react-navigation'

import Intro from './intro/Intro'
import Deposit from './deposit/Deposit'

const drawerRoutes = {
  Intro: { screen: Intro },
  Deposit: { screen: Deposit}
}

export default Routes = DrawerNavigator(drawerRoutes,
  { 
    drawerBackgroundColor: 'rgba(0,0,0,0)'
  }
)