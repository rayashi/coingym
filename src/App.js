import React, {Component} from 'react'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { Provider } from 'react-redux'
import Appsee from 'react-native-appsee'

import Routes from './Routes'
import reducers from './Reducers'

import NavigationService from './NavigationService'

export default class App extends Component {
  componentWillMount () {
    Appsee.start(__DEV__ ? '4d677c98af0e48c3969f7ebce7c18196' : 'bf8c81e12bc64e558c66858c9434ba8f')
  }

  render() {
    return(
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Routes ref={nav => { NavigationService.setTopLevelNavigator(nav) }} />
      </Provider>
    )
  }
}
