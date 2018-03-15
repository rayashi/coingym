import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native'
import {
  Text
} from 'native-base'
import { colors } from '../styles/base'


export default class DashboardMessage extends Component {
  render() {
    if(this.props.funds.length !== 1 || this.props.loading) 
      return null

    return (
      <View>
        <Text style={styles.title}>Everyone starts from scratch</Text>
        <Text style={styles.text}>
          Now that you have some money, it’s time to buy
          crypto currencies. We will be your first exchange
          for learn, a place where you can buy and sell coins.
        </Text>
        <Text style={styles.text}>Touch here to start.</Text>
        <Image source={require('../../images/arrow.png')}
          resizeMode='contain' style={styles.arrow}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    color: 'gray',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 20,
    fontSize: 18,
  },
  title: {
    paddingHorizontal: 18,
    fontSize: 22,
    color: colors.primary,
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginVertical: 16,
  },
  arrow: {
    width: 40,
    height: 130,
    alignSelf: 'center',
    marginBottom: 20,
    marginLeft: 30
  }  
})

