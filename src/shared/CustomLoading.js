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
    return (
      <View>
        {this.props.show?
          <ActivityIndicator size={SIZE} style={styles.loading}/>
        :null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    top: (Dimensions.get('window').height/2) - (SIZE/2),
    left: (Dimensions.get('window').width/2) - (SIZE/2),
  }
})

