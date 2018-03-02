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
    <TouchableOpacity onPress={this._onSelectPair.bind(this, item)} style={styles.item}>
      <View style={styles.lineContent}>
        <View style={styles.pairContent}>
          <Image source={{ uri: item.buy.image  }} style={{width: 30, height: 30}}/>
        </View>
        <View style={styles.pairCenter}>
        </View>
        <View style={styles.pairContent}>
          <Image source={{ uri: item.paywith.image  }} style={{width: 30, height: 30}}/>
        </View>
      </View>

      <View style={styles.lineContent}>
        <View style={styles.pairContent}>
          <Text style={styles.coinName}>{item.buy.name}</Text>
        </View>
        <View style={styles.pairCenter}>
          <Text style={{fontWeight:'bold'}}>{item.id}</Text>
        </View>
        <View style={styles.pairContent}>
          <Text style={styles.coinName}>{item.paywith.name}</Text>
        </View>
      </View>

      <View style={styles.lineContent}>
        <View style={styles.pairContent}>
          <Text>1 {item.buy.symbol}</Text>
        </View>
        <View style={styles.pairCenter}>
          <Text>=</Text>
        </View>
        <View style={styles.pairContent}>
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
        <CustomHeader title='Buy / Pay With'/>
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
  }

})
