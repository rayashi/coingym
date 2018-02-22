import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} from 'react-native'
import { 
  Icon,
} from 'native-base'

import colors from '../styles/base'

export default class FabButton extends Component {

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
        <Icon name={this.props.icon} style={{color:'white'}}/>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {width: 0,height: 4},
    shadowOpacity: 0.5,
    position: 'absolute',
    borderRadius: 28,
    height: 56,
    width: 56,
    padding: 12,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: colors.primary,
    bottom: 15,
    right: 20
  }
})

