
import React, { Component } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image,
  Slider
} from 'react-native'
import { 
  Card,
  CardItem,
  Body,
  Icon
} from 'native-base'
import { colors } from '../styles/base';


export default class OrderCard extends Component {

  _renderSpendHeader = coin => ( 
    <View style={styles.headerLine}>
      <View style={styles.headerColumn}>
        <Text style={styles.headerTitleNegative}>
          {this.props.type === 'spend'?'SPEND':'SELL' }
        </Text>
      </View>
      <View style={styles.headerColumn}>
        <Icon name='md-arrow-round-forward' size={32} style={styles.arrowIconNegative}/>
      </View>
      <View style={styles.headerColumn}>
        <Image source={{ uri: coin.image  }} style={styles.coinImage}/>      
      </View>                    
    </View>
  )

  _renderReceiveHeader = coin => ( 
    <View style={styles.headerLine}>
      <View style={styles.headerColumn}>
        <Image source={{ uri: coin.image  }} style={styles.coinImage}/>      
      </View>
      <View style={styles.headerColumn}>
        <Icon name='md-arrow-round-back' size={32} style={styles.arrowIconPositive}/>
      </View>
      <View style={styles.headerColumn}>
        <Text style={styles.headerTitlePositive}>RECEIVE</Text>
      </View>
    </View>
  )

  render() {
    let { coin } = this.props
    let { type } = this.props
    if(!coin) return null

    return (
      <Card style={styles.card}>
        <CardItem>
          <Body style={styles.cardBody}>
            {type === 'spend' || type === 'sell'?
              this._renderSpendHeader(coin)
            :
              this._renderReceiveHeader(coin)
            }
            
            <Slider width='100%'
              minimumTrackTintColor={type==='spend'||type==='sell'?colors.negative:colors.positive}
              thumbTintColor={type==='spend'||type==='sell'?colors.negative:colors.positive}
              value={coin.amount}
              maximumValue={coin.maximumValue}
              onValueChange={this.props.onChangeAmount}
              step={coin.step}/>

            <View style={styles.amountLine}>
              <View>
                <TouchableOpacity style={styles.fixButton} onPress={this.props.onDecrement}>
                  <Text style={{fontSize: 40, marginBottom: 5}}>-</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.amount}>
                <Text> 
                  {coin.amount.toFixed(coin.precision)}
                  <Text style={{fontWeight:'bold'}}>&nbsp;{coin.id.toUpperCase()}</Text>
                </Text>    
              </View>                    
              <View>
                <TouchableOpacity style={styles.fixButton} onPress={this.props.onIncrement}>
                  <Text style={{ fontSize: 30, marginBottom: 2.5}}>+</Text>
                </TouchableOpacity>
              </View>                    
            </View>

          </Body>
        </CardItem>
      </Card>
    )
  }
}


const styles = StyleSheet.create({
  card: {
    padding: 6
  },
  amountLine: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 14,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  headerLine: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10
  },
  cardBody: {
    alignItems: 'center'
  },
  coinImage: {
    width: 35, 
    height: 35,
    marginBottom: 10
  },
  headerTitlePositive: {
    fontSize: 18,
    fontWeight: 'bold',
    color:colors.positive, 
    marginTop: -10
  },
  headerTitleNegative: {
    fontSize: 18,
    fontWeight: 'bold',
    color:colors.negative, 
    marginTop: -10
  },
  fixButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    width: 26,
    height: 26,
    borderRadius: 13
  },
  amount: {
    flex:6, 
    alignItems:'center'
  },
  arrowIconNegative: {
    color:colors.negative, 
    marginTop: -10
  },
  arrowIconPositive: {
    color:colors.positive, 
    marginTop: -10
  },
  headerColumn: {
    marginHorizontal: 8
  }
})

