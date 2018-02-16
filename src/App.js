import React, {Component} from 'react'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { Provider } from 'react-redux'

import Routes from './Routes'
import reducers from './Reducers'

export default class App extends Component{

  render() {
    return(
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Routes ref={nav => { this.navigator = nav }} />
      </Provider>
    ) 
  }
}
