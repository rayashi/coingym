import React from 'react'
import {
  StyleSheet,
  View,
  StatusBar,
  FlatList
} from 'react-native'
import { connect } from 'react-redux'

import { colors } from '../styles/base'
import CustomHeader from '../shared/CustomHeader'
import CustomLoading from '../shared/CustomLoading'
import { setMarkets, getMarkets } from './CoinListActions'
import MarketItem from './MarketItem'
import UnavailableModal from './UnavailableModal'

class CoinList extends React.Component {
  static navigationOptions = { header: null }
  state = { 
    modalVisible: false,
    selectedMarket: null 
  }

  componentWillMount () {
    this.props.setMarkets([])
    this.props.getMarkets(this.props.funds)
  }
  
  _onSelectPair(market){
    if(market.loadingPrice) return null
    if(!market.available){
      this.setState({
        modalVisible: true,
        selectedMarket: market
      })
      return null
    }
    this.props.navigation.navigate('Order', {market})
  }

  _onModalClose(){
    this.setState({
      modalVisible: true,
      selectedMarket: null
    })
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
        <UnavailableModal
          onclose={this._onModalClose.bind(this)} 
          visible={this.state.modalVisible}
          market={this.state.selectedMarket}/>
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
