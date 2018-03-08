import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Image,
  StatusBar,
  Dimensions,
  ActivityIndicator
} from 'react-native'
import { 
  Content,
  Text, 
  Button, 
  Icon,
  Container,
  Right
} from 'native-base'
import { connect } from 'react-redux'
import firebase from 'react-native-firebase'
import LinearGradient from 'react-native-linear-gradient'

import colors from '../styles/base'
import { subscribeAuthChange } from './LoadingActions'

class Loading extends Component {
  static navigationOptions = { header: null }

  componentDidMount() {
    this.props.subscribeAuthChange(this.props.navigation)  
  }

  componentWillUnmount() {
    if(this.props.unsubscribeAuthChange){
      this.props.unsubscribeAuthChange()
    }
  }

  render() {
    return (
      <Container>
        <StatusBar hidden />
        <LinearGradient colors={colors.gradient} 
          style={[styles.mainContent, {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
          }]}>

          <ActivityIndicator size={50} color='white'/>
          <Text style={{color:'white', padding: 16}}> Loading </Text>
        </LinearGradient>
      </Container>
    )
  }
}

const mapStateToProps = state => (
  {
    unsubscribeAuthChange: state.LoadingReducer.unsubscribeAuthChange
  }
)

export default connect(mapStateToProps, { 
  subscribeAuthChange
}
)(Loading)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

