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
      order: initialOrderSetup(funds, market, this.props.order.action)
    })
  }

  _onPlaceOrder = e => {
    e.preventDefault()
    if (this.props.loading) return null
    this.props.placeOrder(
      this.state.order,
      this._orderCreated.bind(this)
    )
  }

  _orderCreated() {
    if(!this.props.currentUser || this.props.currentUser.isAnonymous){
      this._goToFunds()
    }else {
      this.setState({ orderCreated : true })
    }
  }

  _goToFunds = e => {
    if(e) e.preventDefault()
    this.setState({ orderCreated : false })
    if(!this.props.currentUser || this.props.currentUser.isAnonymous){
      this.props.navigation.navigate('Auth', {from:'Order'})
    }else {
      this.props.navigation.navigate('Dashboard')
    }
  }

  _onChangeQuoteAmount = value => {
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

  _onChangeBaseAmount = value => {
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

  _onIncrementQuote = e =>{
    e.preventDefault()
    let { order } = this.state
    if(order.quote.amount >= order.quote.maximumValue) return null
    let value = order.quote.amount + order.quote.step
    this._onChangeQuoteAmount(value)
  }

  _onIncrementBase = e => {
    e.preventDefault()
    let { order } = this.state
    if(order.base.amount >= order.base.maximumValue) return null
    let value = order.base.amount + order.base.step
    this._onChangeBaseAmount(value)
  }

  _onDecrementQuote = e => {
    e.preventDefault()
    let { order } = this.state
    if(order.quote.amount <= 0) return null
    let value = order.quote.amount - order.quote.step
    this._onChangeQuoteAmount(value)
  }

  _onDecrementBase = e =>{
    e.preventDefault()
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
        <CustomHeader title='Order'
          leftIcon='ios-arrow-back'
          onLefButtonPress={()=>this.props.navigation.goBack()}/>
        <Container >
          <Content style={{padding:8}}>
            {order.action === 'buy' ? 
              <View>
                <OrderCard coin={order.quote} type='spend'
                  onChangeAmount={val => this._onChangeQuoteAmount(val)}
                  onIncrement={this._onIncrementQuote}
                  onDecrement={this._onDecrementQuote}/>
                <OrderCard coin={order.base} type='receive'
                  onChangeAmount={val => this._onChangeBaseAmount(val)}
                  onIncrement={this._onIncrementBase}
                  onDecrement={this._onDecrementBase}/>
              </View>
            :
              <View>
                <OrderCard coin={order.base} type='sell'
                  onChangeAmount={val => this._onChangeBaseAmount(val)}
                  onIncrement={this._onIncrementBase}
                  onDecrement={this._onDecrementBase}/>
                <OrderCard coin={order.quote} type='receive'
                  onChangeAmount={val => this._onChangeQuoteAmount(val)}
                  onIncrement={this._onIncrementQuote}
                  onDecrement={this._onDecrementQuote}/>
              </View>
            }

            <Button block rounded style={styles.button}
              onPress={this._onPlaceOrder}>
              <Text>Place my order</Text>
            </Button>
          </Content>
        </Container>
        <CustomLoading show={this.props.loading}/>
        <CreateOrderModal visible={this.state.orderCreated} onClose={this._goToFunds}/>
      </View>
    )
  }
}

const mapStateToProps = state => (
  {
    order: state.OrderReducer.order,
    loading: state.OrderReducer.loading,
    funds: state.DashboardReducer.funds,
    currentUser: state.AuthReducer.currentUser
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
