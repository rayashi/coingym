import React from 'react'
import {
  StyleSheet,
  View,
  Image,
  StatusBar,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions
} from 'react-native'
import { Text } from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'

import colors from '../styles/base'
import CustomHeader from '../shared/CustomHeader'
import CustomLoading from '../shared/CustomLoading'
import { setMarkets, getMarkets } from './CoinListActions'
import MarketItem from './MarketItem'

class CoinList extends React.Component {
  static navigationOptions = { header: null }
  
  componentWillMount () {
    this.props.setMarkets([])
    this.props.getMarkets(this.props.funds)
  }
  
  _onSelectPair(pair){
    this.props.navigation.navigate('Order', {pair})
  }

  _keyExtractor = (item, index) => item.id
  
  _renderItem = ({item}) => (
    <MarketItem item={item} onPress={this._onSelectPair.bind(this, item)}/>
  )

  render() {
    return (
      <View style={styles.main}>
        <StatusBar hidden={false} backgroundColor={colors.primary}/>
        <CustomHeader title='Buy / Pay With'/>
        <FlatList
          data={this.props.markets}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}/>
        <CustomLoading show={this.props.loading}/>
      </View>
    )
  }
}

const mapStateToProps = state => (
  {
    loading: state.CoinListReducer.loading,
    markets: state.CoinListReducer.markets,
    funds: state.DashboardReducer.funds
  }
)

export default connect(mapStateToProps, {
  setMarkets, 
  getMarkets
})(CoinList)

const styles = StyleSheet.create({
  main: {
    flex: 1
  }
})
