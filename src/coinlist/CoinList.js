import React from 'react'
import {
  StyleSheet,
  View,
  Image,
  StatusBar,
  Keyboard,
  FlatList,
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
  componentWillMount () {
    this.props.getCoinsPrice()
  }

  _keyExtractor = (item, index) => item.id.toString()
  
  _renderItem = ({item}) => (
    <ListItem avatar>
      <Left>
        <Image source={{ uri: item.image  }}  
              style={{width: 32, height: 32}}/>
      </Left>
      <Body>
        <Text >{item.symbol}</Text>
        <Text note>{item.name}</Text>
      </Body>
      <Right>
        <Text >{item.price_usd}</Text>
      </Right>
    </ListItem>
  )

  _onBuy() {
    
  }

  render() {
    return (
      <View style={{flex:1}}>
        <StatusBar backgroundColor={colors.primary}/>
        <CustomHeader title='Buy'/>
        <FlatList
          data={this.props.coinsInfo}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}/>
      </View>
    )
  }
}

const mapStateToProps = state => (
  {
    coinsInfo: state.CoinListReducer.coinsInfo,
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
  }

})
