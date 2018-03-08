import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ActivityIndicator
} from 'react-native'
import { 
  Content,
  Text, 
  Button, 
  Icon,
  Container,
  Footer,
  FooterTab,
  Right
} from 'native-base'
import { Toast } from 'native-base'
import { connect } from 'react-redux'
import firebase from 'react-native-firebase'
import LinearGradient from 'react-native-linear-gradient'

import colors from '../styles/base'
import { formsStyles } from '../styles/forms'
import { 
  setUsername, 
  setPassword, 
  login, 
  loginWithFacebook,
  loginWithGoogle 
} from './AuthActions'


class Auth extends Component {
  static navigationOptions = { header: null }

  componentDidMount() {
    console.log(firebase.auth().currentUser)

  }
  
  _onLoginWithFacebook(){
    if(this.props.loading) return null
    this.props.loginWithFacebook(this.props.navigation, 'Dashboard')
  }
  
  _onLoginWithGoogle(){
    if(this.props.loading) return null
    this.props.loginWithGoogle(this.props.navigation, 'Dashboard')
  }

  _onLogin(){
    if(this.props.loading) return null
    if(!this._canLogin()) return null
    this.props.login(this.props.username, this.props.password, this.props.navigation, 'Dashboard')
  }

  _canLogin(){
    let { username_valid, password_valid } = this.props 
    if(!username_valid){
      Toast.show({
        text: 'Please, give me a valid email', 
        type: 'danger',
        position: 'top',
        duration: 2500
      })
      return false
    }else if(!password_valid){
      Toast.show({
        text: 'This password is to short', 
        type: 'danger',
        position: 'top',
        duration: 2500
      })
      return false
    }
    return true
  }

  _onRegister() {
    this.props.navigation.navigate('Register')
  }

  _onCancel() {
    this.props.navigation.navigate('Dashboard')
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

          <Content contentContainerStyle={{flex:1, width: Dimensions.get('window').width}}>
            <View style={styles.container}>
              <TouchableOpacity style={styles.close} 
                onPress={this._onCancel.bind(this)}>
                <Icon name='ios-close-circle-outline' size={32} style={{color:'rgba(255,255,255,0.4)'}}/>
              </TouchableOpacity>
              <View style={styles.icon}>
                <Image style={styles.logo} source={require('../../images/pigbit.png')}/>
                <Text style={{color: 'white', fontSize: 30}}> Coingym </Text>
              </View>
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
      </Container>
      
      
    )
  }
}

const mapStateToProps = state => (
  {
    username: state.AuthReducer.username,
    password: state.AuthReducer.password,
    loading: state.AuthReducer.loading,
    name_valid: state.AuthReducer.name_valid,
    username_valid: state.AuthReducer.username_valid,
    password_valid: state.AuthReducer.password_valid
  }
)

export default connect(mapStateToProps, { 
  setUsername, 
  setPassword,
  login,
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
    height: 100,
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
    justifyContent: 'center',
  },
  buttons: {
    marginTop: 10
  }
})

