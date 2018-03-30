import React from 'react'
import {
  StyleSheet,
  View,
  StatusBar,
  FlatList,
  BackHandler
} from 'react-native'
import { connect } from 'react-redux'

import { colors } from '../styles/base'
import CustomHeader from '../shared/CustomHeader'
import FabButton from '../shared/FabButton'
import { subscribeFundsChange, cancelOrder } from './DashboardActions'
import { setOrderAction } from '../order/OrderActions'
import DashboardItem from './DashboardItem'
import DashboardMessage from './DashboardMessage'
import CustomLoanding from '../shared/CustomLoading'

class Dashboard extends React.Component {
  static navigationOptions = { header: null }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress',() => true)
    this.props.subscribeFundsChange()
  }
 
  componentWillUnmount() {
    if(this.props.unsubscribeFundsChange){
      this.props.unsubscribeFundsChange()
    }
  }
  
  _onBuy() {
    this.props.setOrderAction('buy')
    this.props.navigation.navigate('CoinList', {fundToSell:null})
  }

  _onOrderCancel = item => e => {
    e.preventDefault()
    if(this.props.deletingOrder || !item.pending) return null
    this.props.cancelOrder(item)
  }

  _onSell = item => e => {
    e.preventDefault()
    if(this.props.deletingOrder || item.pending || item.fiat) return null
    this.props.setOrderAction('sell')
    this.props.navigation.navigate('CoinList', {fundToSell:item})
  }

  _keyExtractor = item => item.id

  _renderItem = ({item}) => (
    <DashboardItem item={item}
      onSell={this._onSell} 
      onOrderCancel={this._onOrderCancel}/>
  )

  render() {
    return (
      <View style={styles.main}>
        <StatusBar hidden={false} backgroundColor={colors.primary}/>
        <CustomHeader title='Funds'/>

        <FlatList
          data={this.props.funds}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}/>

        <DashboardMessage funds={this.props.funds} 
          loading={this.props.loading}/>

        <FabButton icon='md-add' 
          onPress={this._onBuy.bind(this)}/>

        <CustomLoanding show={this.props.deletingOrder}/>
      </View>
    )
  }
}

const mapStateToProps = state => (
  {
    loading: state.DashboardReducer.loading,
    funds: state.DashboardReducer.funds,
    unsubscribeFundsChange: state.DashboardReducer.unsubscribeFundsChange,
    deletingOrder: state.DashboardReducer.deletingOrder
  }
)

export default connect(mapStateToProps, {
  cancelOrder,
  subscribeFundsChange,
  setOrderAction,
})(Dashboard)

const styles = StyleSheet.create({
  main: {
    flex: 1
  }
})
