import React from 'react'
import {
  StyleSheet,
  Text,
  Image,
  StatusBar,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'

import AppIntroSlider from 'react-native-app-intro-slider'
import { colors } from '../styles/base'
import { signInAnonymously } from '../auth/AuthActions'

const styles = StyleSheet.create({
  image: {
    width: 180,
    height: 180,
  },
  text: {
    color: colors.textOnBG,
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 20,
    fontSize: 20,
  },
  title: {
    paddingHorizontal: 20,
    fontSize: 28,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginVertical: 16,

  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const slides = [
  {
    key: '1',
    title: 'Learn crypto currency investment without the risk',
    text: '',
    image: require('../../images/pigbit.png'),
  },
  {
    key: '2',
    title: 'Get your feet wet',
    text: 'You will be able to invest using artificial money, all the fun with no risk',
    image: require('../../images/flask.png'),
  },
  {
    key: '3',
    title: 'Real market conditions',
    text: 'Feel the market before you go real to make wise investments',
    image: require('../../images/analytics.png'),
  }
]

class Intro extends React.Component {
  static navigationOptions = { header: null }
  
  _onSkip = () => {
    this.props.navigation.navigate('Auth', {from:'Intro'})
  }
  
  _onDone = () => {
    if(!this.props.currentUser.uid){
      this.props.signInAnonymously()
    }
    this.props.navigation.navigate('Deposit')
  }
  
  _renderItem = props => (
    <LinearGradient colors={colors.gradient} 
      style={[styles.mainContent, {
        paddingTop: props.topSpacer,
        paddingBottom: props.bottomSpacer,
        width: props.width,
        height: props.height,
      }]}>
      
      <StatusBar backgroundColor={colors.primary}/>
      <Image source={props.image} style={styles.image}/>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.text}>{props.text}</Text>
    </LinearGradient>
  )

  render() {
    return (  
      <AppIntroSlider
        skipLabel='Already have an account'
        doneLabel="Let's start"
        slides={slides}
        renderItem={this._renderItem}
        onDone={this._onDone}
        onSkip={this._onSkip}
        bottomButton
        showSkipButton={!this.props.currentUser.uid}/>
    )
  }
}

const mapStateToProps = state => (
  {
    currentUser : state.AuthReducer.currentUser
  }
)

export default connect(mapStateToProps, {
  signInAnonymously
})(Intro)
