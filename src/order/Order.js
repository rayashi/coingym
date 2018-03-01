import React from 'react'
import {
  StyleSheet,
  View,
  Image,
  StatusBar,
  Keyboard,
  FlatList,
  Slider
} from 'react-native'
import { 
  Text, 
  Button,
  Left,
  Right,
  Body,
  Fab,
  Icon,
  Card,
  CardItem,
  Container,
  Content
} from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'

import colors from '../styles/base'
import CustomHeader from '../shared/CustomHeader'


class Order extends React.Component {
  static navigationOptions = { header: null }
  
  constructor(props) {
    super(props);
    this.state = { 
      balance: null,
      pair: null
    }
  }

  componentWillMount () {
    let { pair } = this.props.navigation.state.params
    let { mycoins } = this.props
    let balance = mycoins.find(function (obj) { return obj.symbol === pair.paywith.symbol })
    pair.paywith.value = 0
    this.setState({
      balance: balance,
      pair: pair,
    })
  }

  _onBuy() {
    
  }

  _onChangePayWith(value){
    let { pair } = this.state
    this.setState({
      pair: {
        ...pair,
        paywith : {
          ...pair.paywith,
          amount: value
        },
        buy : {
          ...pair.buy,
          amount: value / pair.price
        }
      }
    })
  }
  _onChangeBuy(value){
    let { pair } = this.state
    this.setState({
      pair: {
        ...pair,
        paywith : {
          ...pair.paywith,
          amount: pair.price * value
        },
        buy : {
          ...this.state.pair.buy,
          amount: value
        }
      }
    })
  }


  render() {
    let { pair, balance } = this.state
    if(!pair || !balance) return null

    return (
      <View style={{flex:1}}>
        <StatusBar backgroundColor={colors.primary}/>
        <CustomHeader title='Order'/>
        <Container style={{padding:8}}>
          <Content>
            <Card style={styles.card}>
              <CardItem>
                <Body>
                  <Text style={styles.ask}>How much {pair.paywith.name}s do you want yo spend?</Text>
                  <Slider width='100%'
                    value={pair.paywith.amount}
                    maximumValue={this.state.balance.amount}
                    onValueChange={val => this._onChangePayWith.bind(this)(val)}
                    step={1}/>
                  <Text style={{marginTop: 14}}> {pair.paywith.amount} {pair.paywith.symbol}</Text>
                </Body>
              </CardItem>
            </Card>
            <Card style={styles.card}>
              <CardItem>
                <Body>
                  <Text style={styles.ask}>How much {pair.buy.name}s do you want to buy?</Text>
                  <Slider width='100%'
                    value={pair.buy.amount}
                    maximumValue={(balance.amount/pair.price)}
                    onValueChange={val => this._onChangeBuy.bind(this)(val)}
                    step={0.00000001}/>
                  <Text style={{marginTop: 14}}>{pair.buy.amount} {pair.buy.symbol}</Text>
                </Body>
              </CardItem>
            </Card>
            <Button block rounded style={styles.button}>
              <Text>Place my order</Text>
            </Button>
          </Content>
        </Container>
      </View>
    )
  }
}

const mapStateToProps = state => (
  {
    mycoins: state.DashboardReducer.mycoins,
  }
)

export default connect(mapStateToProps, {})(Order)

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
  ask: {
    alignSelf:'center', 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 20
  },
  card: {
    padding: 6
  },
  button: {
    marginTop: 12
  }
})