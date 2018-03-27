import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import { 
  Content,
  Text, 
  Button, 
  Icon,
  Container
} from 'native-base'
import { connect } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'

import { colors } from '../styles/base'
import { formsStyles } from '../styles/forms'
import {
  loginWithFacebook,
  loginWithGoogle 
} from './AuthActions'
import CustomLoanding from '../shared/CustomLoading'

class Auth extends Component {
  static navigationOptions = { header: null }

  _onLoginWithFacebook(){
    if(this.props.loading) return null
    this.props.loginWithFacebook(this.props.navigation, 'Dashboard')
  }
  
  _onLoginWithGoogle(){
    if(this.props.loading) return null
    this.props.loginWithGoogle(this.props.navigation, 'Dashboard')
  }

  _onCancel() {
    const { from } = this.props.navigation.state.params
    if(from === 'Intro'){
      this.props.navigation.navigate('Intro')
    }else {
      this.props.navigation.navigate('Dashboard')
    }
  }

  render() {
    const { from } = this.props.navigation.state.params

    return (
      <Container>
        <StatusBar hidden />
        
        <LinearGradient colors={colors.gradient} 
          style={[styles.mainContent, {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
          }]}>

          <Content contentContainerStyle={{flex:1, width: Dimensions.get('window').width}}>
            <View style={styles.container}>
              <TouchableOpacity style={styles.close} 
                onPress={this._onCancel.bind(this)}>
                <Icon name='ios-close-circle-outline' size={32} style={{color:'rgba(255,255,255,0.4)'}}/>
              </TouchableOpacity>
              
              {from === 'Intro' ?
                <View style={styles.icon}>
                  <Image style={styles.logo} source={require('../../images/pigbit.png')}/>
                  <Text style={{color: 'white', fontSize: 30}}> Coingym </Text>
                </View>
              :null}
              {from === 'Order' ?
                <View style={styles.icon}>
                  <Icon style={styles.successIcon} name='md-checkmark-circle-outline'/>
                  <Text style={styles.h1}>Congratulation your order has been successfully created!</Text>
                  <Text style={styles.h2}>Please sign in then you can follow orders status on the funds screen</Text>
                </View>
              :null}

              <View style={styles.form}>
                <View style={styles.buttons} >
                  <Button block bordered light style={formsStyles.button} 
                    onPress={this._onLoginWithFacebook.bind(this)}>
                    <Icon style={{left:10}} name='logo-facebook' size={32}/>
                    <Text>Sign in using Facebook</Text>
                  </Button>
                  <Button block bordered light style={formsStyles.button} 
                    onPress={this._onLoginWithGoogle.bind(this)}>
                    <Icon style={{left:4}} name='logo-google' size={32}/>
                    <Text>Sign in using Google</Text>
                  </Button>
                </View>
              </View>
            </View>
          </Content>
        </LinearGradient>
        <CustomLoanding show={this.props.loading}/>
      </Container>      
    )
  }
}

const mapStateToProps = state => (
  {
    loading: state.AuthReducer.loading
  }
)

export default connect(mapStateToProps, { 
  loginWithFacebook,
  loginWithGoogle
}
)(Auth)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  icon: {
    alignItems: 'center',
    padding: 30
  },
  form: {
    paddingHorizontal: 12,
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 10    
  },
  action: {
    marginVertical: 12,
    height: 30
  },
  logo: {
    width: 100,
    height: 100
  },
  close: {
    zIndex: 1,
    padding: 10,
    position: 'absolute',
    top: 0,
    right: 0
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttons: {
    marginTop: 10
  },
  h1: {
    marginTop: 10,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white'
  },
  h2: {
    marginTop: 15,
    fontSize: 16,
    textAlign: 'center',
    color: 'rgba(255,255,255,0.8)'
  },
  successIcon: {
    color:'white',
    fontSize: 60
  }
})