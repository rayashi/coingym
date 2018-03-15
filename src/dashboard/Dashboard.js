import React from 'react'
import {
  StyleSheet,
  View,
  StatusBar,
  FlatList,
} from 'react-native'
import { connect } from 'react-redux'

import { colors } from '../styles/base'
import CustomHeader from '../shared/CustomHeader'
import FabButton from '../shared/FabButton'
import { subscribeFundsChange, subscribeOrdersChange } from './DashboardActions'
import { setOrderAction } from '../order/OrderActions'
import DashboardItem from './DashboardItem'
import DashboardMessage from './DashboardMessage'


class Dashboard extends React.Component {
  static navigationOptions = { header: null }

  componentDidMount() {
    this.props.subscribeFundsChange()
  }

  componentWillUnmount() {
    if(this.props.unsubscribeFundsChange){
      this.props.unsubscribeFundsChange()
    }
  }
  
  _onBuy() {
    this.props.setOrderAction('buy')
    this.props.navigation.navigate('CoinList')
  }

  _keyExtractor = item => item.id

  _renderItem = ({item}) => <DashboardItem item={item}/>

  render() {
    return (
      <View style={styles.main}>
        <StatusBar backgroundColor={colors.primary}/>
        <CustomHeader title='Funds'/>

        <FlatList
          data={this.props.funds}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}/>

        <DashboardMessage funds={this.props.funds} 
          loading={this.props.loading}/>

        <FabButton icon='md-add' 
          onPress={this._onBuy.bind(this)}/>
      </View>
    )
  }
}

const mapStateToProps = state => (
  {
    loading: state.DashboardReducer.loading,
    funds: state.DashboardReducer.funds,
    unsubscribeFundsChange: state.DashboardReducer.unsubscribeFundsChange,
  }
)

export default connect(mapStateToProps, {
  subscribeFundsChange,
  setOrderAction
})(Dashboard)

const styles = StyleSheet.create({
  main: {
    flex: 1
  }
})
