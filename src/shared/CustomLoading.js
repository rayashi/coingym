import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator
} from 'react-native'

const SIZE = 40

export default class CustomLoading extends Component {
  render() {
    if(!this.props.show) return null
    return (
      <ActivityIndicator size={SIZE} style={styles.loading}/>
    )
  }
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    top: (Dimensions.get('window').height/2) - (SIZE/2),
    left: (Dimensions.get('window').width/2) - (SIZE/2)
  }
})

