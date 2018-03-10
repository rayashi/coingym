import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text
} from 'react-native'


export default class MarketItem extends Component {
  render() {
    const { item } = this.props
    return (
      <TouchableOpacity onPress={this.props.onPress} style={styles.item}>
        <View style={styles.lineContent}>
          <View style={styles.pairContent}>
            <Image source={{ uri: item.base.image }} 
              style={[styles.image, !item.available?styles.unavailable:null]}/>
          </View>
          <View style={styles.pairCenter}>
          </View>
          <View style={styles.pairContent}>
            <Image source={{ uri: item.quote.image }} 
            style={[styles.image, !item.available?styles.unavailable:null]}/>
          </View>
        </View>
        <View style={styles.lineContent}>
          <View style={styles.pairContent}>
            <Text style={[styles.coinName, !item.available?styles.unavailable:null]}>
              {item.base.name}
            </Text>
          </View>
          <View style={styles.pairCenter}>
            <Text style={[styles.pairSymbol, !item.available?styles.unavailable:null]}>
              {item.symbol}
            </Text>
          </View>
          <View style={styles.pairContent}>
            <Text style={[styles.coinName, !item.available?styles.unavailable:null]}>
              {item.quote.name}
            </Text>
          </View>
        </View>
        <View style={styles.lineContent}>
          <View style={styles.pairContent}>
            <Text style={[styles.coinPrice, !item.available?styles.unavailable:null]}>
              1 {item.base.id.toUpperCase()}
            </Text>
          </View>
          <View style={styles.pairCenter}>
            <Text style={!item.available?styles.unavailable:null}>=</Text>
          </View>
          <View style={styles.pairContent}>
            <Text style={[styles.coinPrice, !item.available?styles.unavailable:null]}>
              {item.price} {item.quote.id.toUpperCase()}
            </Text>
          </View>
        </View>
      </TouchableOpacity >
    )
  }
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderBottomColor: 'rgba(0,0,0,0.2)',
    borderBottomWidth: 0.2,
    marginHorizontal: 12
  },
  lineContent: {
    flex: 1,
    flexDirection: 'row',
  },
  pairContent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pairCenter: {
    flex: 1,
    alignItems: 'center',
  },
  coinName: {
    alignSelf: 'center',
    fontSize: 12
  },
  unavailable: {
    opacity: 0.3
  },
  image: {
    width: 30, 
    height: 30
  },
  pairSymbol:{
    fontWeight: 'bold'
  }
})

