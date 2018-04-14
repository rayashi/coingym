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
import Appsee from 'react-native-appsee'

class CoinList extends React.Component {
  static navigationOptions = { header: null }
  state = {
    title: 'Buy / Pay With',
    modalVisible: false,
    selectedMarket: null
  }

  componentWillMount () {
    const { fundToSell } = this.props.navigation.state.params
    const { payWith } = this.props.navigation.state.params

    if (fundToSell) {
      this.setState({title:'Sell / Receive In'})
      Appsee.addEvent('Sell init', { fund : Object.assign({}, fundToSell) })
    } else {
      Appsee.addEvent('Buy init')
    }

    this.props.setMarkets([])
    this.props.getMarkets(this.props.funds, fundToSell, payWith)
  }

  _onSelectPair(market) {
    if (market.loadingPrice) return null

    if (!market.available) {
      Appsee.addEvent('Unavailable pair selected', { market : JSON.parse(JSON.stringify(market)) })

      this.setState({
        modalVisible: true,
        selectedMarket: market
      })

      return null
    }

    Appsee.addEvent('Pair selected', { market : JSON.parse(JSON.stringify(market)) })

    this.props.navigation.navigate('Order', { market })
  }

  _onModalClose(){
    this.setState({
      modalVisible: true,
      selectedMarket: null
    })
  }

  _keyExtractor = item => item.id

  _renderItem = ({item}) => (
    <MarketItem item={item} onPress={this._onSelectPair.bind(this, item)}/>
  )

  render() {
    return (
      <View style={styles.main}>
        <StatusBar hidden={false} backgroundColor={colors.primary}/>
        <CustomHeader title={this.state.title}
          leftIcon='ios-arrow-back'
          onLefButtonPress={()=>this.props.navigation.goBack()}/>
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
