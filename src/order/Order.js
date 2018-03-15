import React from 'react'
import {
  StyleSheet,
  View,
  StatusBar,
} from 'react-native'
import {
  Text,
  Button,
  Container,
  Content
} from 'native-base'
import { connect } from 'react-redux'

import { colors } from '../styles/base'
import CustomHeader from '../shared/CustomHeader'
import CustomLoading from '../shared/CustomLoading'
import { initialOrderSetup, placeOrder } from './OrderActions'
import OrderCard from './OrderCard'
import CreateOrderModal from './CreateOrderModal'

class Order extends React.Component {
  static navigationOptions = { header: null }
  state = { order: null, orderCreated: false }

  componentWillMount () {
    let { market } = this.props.navigation.state.params
    let { funds } = this.props
    this.setState({
      order: initialOrderSetup(funds, market)
    })
  }

  _onPlaceOrder() {
    if (this.props.loading) return null
    this.props.placeOrder(
      this.props.order.action,
      this.state.order,
      this._orderCreated.bind(this)
    )
  }

  _orderCreated() {
    this.setState({ orderCreated : true })
  }

  _goToFunds() {
    this.setState({ orderCreated : false })
    this.props.navigation.navigate('Dashboard')
  }

  _onChangeQuoteAmount(value){
    let { order } = this.state
    this.setState({
      order: {
        ...order,
        quote : {
          ...order.quote,
          amount: value
        },
        base : {
          ...order.base,
          amount: parseFloat((value/order.price).toFixed(order.base.precision))
        }
      }
    })
  }

  _onChangeBaseAmount(value){
    let { order } = this.state
    this.setState({
      order: {
        ...order,
        quote : {
          ...order.quote,
          amount: parseFloat((order.price*value).toFixed(order.quote.precision))
        },
        base : {
          ...this.state.order.base,
          amount: value
        }
      }
    })
  }

  _onIncrementQuote(){
    let { order } = this.state
    if(order.quote.amount >= order.quote.maximumValue) return null
    let value = order.quote.amount + order.quote.step
    this._onChangeQuoteAmount(value)
  }

  _onIncrementBase(){
    let { order } = this.state
    if(order.base.amount >= order.base.maximumValue) return null
    let value = order.base.amount + order.base.step
    this._onChangeBaseAmount(value)
  }

  _onDecrementQuote(){
    let { order } = this.state
    if(order.quote.amount <= 0) return null
    let value = order.quote.amount - order.quote.step
    this._onChangeQuoteAmount(value)
  }

  _onDecrementBase(){
    let { order } = this.state
    if(order.base.amount <= 0) return null
    let value = order.base.amount - order.base.step
    this._onChangeBaseAmount(value)
  }

  render() {
    let { order } = this.state
    if(!order) return null

    return (
      <View style={{flex:1}}>
        <StatusBar backgroundColor={colors.primary}/>
        <CustomHeader title='Order'/>
        <Container style={{padding:8}}>
          <Content>
            <OrderCard coin={order.quote} type='spend'
              onChangeAmount={val => this._onChangeQuoteAmount.bind(this)(val)}
              onIncrement={this._onIncrementQuote.bind(this)}
              onDecrement={this._onDecrementQuote.bind(this)}/>
            <OrderCard coin={order.base} type='receive'
              onChangeAmount={val => this._onChangeBaseAmount.bind(this)(val)}
              onIncrement={this._onIncrementBase.bind(this)}
              onDecrement={this._onDecrementBase.bind(this)}/>
            <Button block rounded style={styles.button}
              onPress={this._onPlaceOrder.bind(this)}>
              <Text>Place my order</Text>
            </Button>
          </Content>
        </Container>
        <CustomLoading show={this.props.loading}/>
        <CreateOrderModal visible={this.state.orderCreated} onClose={this._goToFunds.bind(this)}/>
      </View>
    )
  }
}

const mapStateToProps = state => (
  {
    order: state.OrderReducer.order,
    loading: state.OrderReducer.loading,
    funds: state.DashboardReducer.funds,
  }
)

export default connect(mapStateToProps, {
  placeOrder
})(Order)

const styles = StyleSheet.create({
  button: {
    marginTop: 12,
    backgroundColor: colors.primary
  }
})
