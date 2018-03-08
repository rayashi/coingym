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
import firebase from 'react-native-firebase'

import colors from '../styles/base'
import CustomHeader from '../shared/CustomHeader'
import FabButton from '../shared/FabButton'
import { setFunds } from './DashboardActions'

class Dashboard extends React.Component {
  static navigationOptions = { header: null }

  constructor(props) {
    super(props)
    var user = firebase.auth().currentUser
    this.ref = firebase.firestore().collection('users').doc(`${user.uid}`).collection('funds').orderBy('fiat')
    this.unsubscribe = null
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this._onCollectionUpdate)
  }

  _onCollectionUpdate = (querySnapshot) => {
    this.props.setFunds(querySnapshot)
  }

  _keyExtractor = (item, index) => item.id

  _renderItem = ({item}) => (
    <ListItem avatar>
      <Left>
        <Image source={{ uri: item.image }}  style={{width: 32, height: 32}}/>
      </Left>
      <Body>
        <Text >{item.name}</Text>
        <Text style={{fontWeight:'bold'}} >{item.amount.toFixed(item.precision)}</Text>
      </Body>
      {item.ticker?
        <Right>
          <View style={{flexDirection:'row'}}>
            <View style={{marginRight:6}} >
              {item.ticker.percent_change_24h>0?
                <Icon name='md-arrow-dropup' size={20} style={{color:colors.positive}}/>
              :
                <Icon name='md-arrow-dropdown' size={20} style={{color:colors.negative}}/>
              }
            </View>
            <View >
              <Text style={item.ticker.percent_change_24h>0? styles.positive : styles.negative}>
                {item.ticker.percent_change_24h}%
              </Text>
            </View>
          </View>
          <Text style={item.ticker.percent_change_24h>0? styles.positive : styles.negative}>
            {item.ticker.price_usd} USD
          </Text>
        </Right>
      :null}
    </ListItem>
  )


  _onBuy() {
    let paywith = { symbol: 'USD', name: 'Dollar', image: 'https://firebasestorage.googleapis.com/v0/b/coingym.appspot.com/o/USD.png?alt=media&token=e732110f-bfa6-4366-b1bd-3e4341597f76' }
    this.props.navigation.navigate('CoinList', { paywith })
  }

  render() {
    return (
      <View style={{flex:1}}>
        <StatusBar backgroundColor={colors.primary}/>
        <CustomHeader title='Funds'/>
        <FlatList
          data={this.props.funds}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}/>

        {this.props.funds.length <= 1?
          <View>
            <Text style={styles.title}>Everyone starts from scratch</Text>
            <Text style={styles.text}>Now that you have some money, it’s time to buy crypto currencies. We will be your first exchange for learn, a place where you can buy and sell coins. </Text>
            <Text style={styles.text}>Touch here to start.</Text>
            <Image source={require('../../images/arrow.png')} resizeMode='contain' style={styles.arrow}/>
          </View>
        :null}

        <FabButton icon='md-add' onPress={this._onBuy.bind(this)}/>
      </View>
    )
  }
}

const mapStateToProps = state => (
  {
    funds: state.DashboardReducer.funds,
  }
)

export default connect(mapStateToProps, {
  setFunds
})(Dashboard)

const styles = StyleSheet.create({
  image: {
    width: 180,
    height: 180,
  },
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
  button: {
    marginTop: 10
  },
  label: {
    paddingHorizontal: 18,
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    marginTop: 40
  },
  arrow: {
    width: 40,
    height: 130,
    alignSelf: 'center',
    marginBottom: 20,
    marginLeft: 30
  },
  negative: {
    color: colors.negative
  },
  positive: {
    color: colors.positive
  }

})
