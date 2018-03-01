import React from 'react'
import {
  StyleSheet,
  View,
  Image,
  StatusBar,
  Keyboard,
  FlatList,
  TouchableOpacity
} from 'react-native'
import { 
  Text, 
  Button,
  ListItem,
  Left,
  Right,
  Body,
  Fab,
  Icon
} from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'

import colors from '../styles/base'
import CustomHeader from '../shared/CustomHeader'
import { getCoinsPrice } from './CoinListActions'

class CoinList extends React.Component {
  static navigationOptions = { header: null }
  
  componentWillMount () {
    let { paywith } = this.props.navigation.state.params
    this.props.getCoinsPrice(paywith)
  }

  _onSelectPair(pair){
    this.props.navigation.navigate('Order', {pair})
  }

  _keyExtractor = (item, index) => item.id.toString()
  
  _renderItem = ({item}) => (
    <TouchableOpacity onPress={this._onSelectPair.bind(this, item)}>
      <View style={styles.pairsContent}>
        <View style={styles.pairContent}>
          <Image source={{ uri: item.buy.image  }} style={{width: 32, height: 32}}/>
          <Text>{item.buy.name}</Text>
          <Text>1 {item.buy.symbol}</Text>
        </View>
        <View style={styles.pairCenter}>
          <Text>{item.id}</Text>
          <Text>=</Text>
        </View>
        <View style={styles.pairContent}>
          <Image source={require('../../images/coins/USD.png')} style={{width: 32, height: 32}}/>
          <Text>{item.paywith.name}</Text>
          <Text>{item.price} {item.paywith.symbol}</Text>
        </View>
      </View>
    </TouchableOpacity >
  )

  _onBuy() {
    
  }

  render() {
    return (
      <View style={{flex:1}}>
        <StatusBar backgroundColor={colors.primary}/>
        <CustomHeader title='Buy                              Pay With'/>
        <FlatList
          data={this.props.pairs}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}/>
      </View>
    )
  }
}

const mapStateToProps = state => (
  {
    coinsInfo: state.CoinListReducer.coinsInfo,
    pairs: state.CoinListReducer.pairs,
  }
)

export default connect(mapStateToProps, {
  getCoinsPrice
})(CoinList)

const styles = StyleSheet.create({
  text: {
    color: 'gray',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 20,
    fontSize: 18,
  },
  boldText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  title: {
    paddingHorizontal: 18,
    fontSize: 22,
    color: colors.primary,
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginVertical: 16,
  },
  mainContent: {
    padding:10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pairsContent: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: 'gray',
    marginVertical: 12
  },
  pairContent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  pairCenter: {
    flex: 1,
    alignItems: 'center',
  }

})
