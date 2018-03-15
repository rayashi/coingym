import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native'
import {
  Text,
  ListItem,
  Left,
  Right,
  Body,
  Icon
} from 'native-base'

import { colors } from '../styles/base'

export default class DashboardItem extends Component {
  render() {
    const { item } = this.props
    return (
      <ListItem avatar>
      <Left>
        <Image source={{ uri: item.image }}
          style={[styles.image, item.pending?styles.pending:null]}/>
      </Left>
      <Body>
        <Text style={item.pending?styles.pending:null}>{item.name}</Text>
        <Text style={[styles.amount,item.pending?styles.pending:null]} >
          { item.amountInOrder? 
            (item.amount - item.amountInOrder).toFixed(item.precision)
          :
            item.amount.toFixed(item.precision)
          }
        </Text>
      </Body>
      {item.percentChange24h || item.priceUsd?
        <Right>
          <View style={styles.righTop}>
            <View style={{marginRight:6}} >
              {item.percentChange24h > 0?
                <Icon name='md-arrow-dropup' size={20} style={{color:colors.positive}}/>
              :
                <Icon name='md-arrow-dropdown' size={20} style={{color:colors.negative}}/>
              }
            </View>
            <View >
              <Text style={item.percentChange24h>0? styles.positive : styles.negative}>
                {item.percentChange24h}%
              </Text>
            </View>
          </View>
          <Text style={item.percentChange24h>0? styles.positive : styles.negative}>
            {item.priceUsd} USD
          </Text>
        </Right>
      :null}
      {item.pending?
        <Right>
          <View style={styles.righTop}>
            <Icon name='ios-time-outline' style={styles.pendingIcon}/>
            <Text style={styles.pendingText}>&nbsp; Pending</Text>
          </View>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </Right>
      :null}
    </ListItem>
    )
  }
}

const styles = StyleSheet.create({
  righTop: {
    flexDirection:'row',
    alignItems: 'center'
  },
  image: {
    width: 32, 
    height: 32
  },
  amount: {
    fontWeight:'bold'
  },
  pending: {
    opacity: 0.3
  },
  pendingIcon:{
    color: 'black',
    fontSize: 14
  },
  pendingText: {
    fontSize: 13
  },
  negative: {
    color: colors.negative,
    fontSize: 13,
    fontWeight: 'bold'
  },
  positive: {
    color: colors.positive,
    fontSize: 13,
    fontWeight: 'bold'
  },
  cancelButton: {
    backgroundColor: 'gray',
    paddingVertical: 2,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 2
  },
  buttonText: {
    fontSize: 14,
    color: 'white'
  }
})

