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

export default class CustomHeader extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.title}</Text>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    height: 60,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: colors.primary
  },
  title: {
    fontSize: 18,
    color: 'white',
    marginLeft: 15
  },
  button: {
    padding: 10
  }
})

