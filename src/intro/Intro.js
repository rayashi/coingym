import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';

import AppIntroSlider from 'react-native-app-intro-slider';


const styles = StyleSheet.create({
  image: {
    width: 180,
    height: 180,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
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

export default class Intro extends React.Component {
  _onDone = () => {
    this.props.navigation.navigate('Deposit')
  }
  
  _renderItem = props => (
    <LinearGradient colors={['#5691c8', '#267871']} 
      style={[styles.mainContent, {
        paddingTop: props.topSpacer,
        paddingBottom: props.bottomSpacer,
        width: props.width,
        height: props.height,
      }]}>
      
      <StatusBar backgroundColor="#5691c8"/>
      <Image source={props.image} style={styles.image}/>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.text}>{props.text}</Text>
    </LinearGradient>
  )

  render() {
    return (  
      <AppIntroSlider
        doneLabel="Let's start"
        slides={slides}
        renderItem={this._renderItem}
        onDone={this._onDone}/>
    )
  }
}
