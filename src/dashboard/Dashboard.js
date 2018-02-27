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
import FabButton from '../shared/FabButton'

class Dashboard extends React.Component {
  _keyExtractor = (item, index) => item.coin.id
  
  _renderItem = ({item}) => (
    <ListItem avatar>
      <Left>
        <Image source={{ uri: item.coin.icon }}  style={{width: 32, height: 32}}/>
      </Left>
      <Body>
        <Text >{item.coin.id}</Text>
        <Text note>{item.coin.name}</Text>
      </Body>
      <Right>
        <Text >{item.amount}</Text>
      </Right>
    </ListItem>
  )

  _onBuy() {
    let paywith = { symbol: 'USD', name: 'Dollar', image: '../../images/coins/USD.png' }
    this.props.navigation.navigate('CoinList', { paywith })
  }

  render() {
    return (
      <View style={{flex:1}}>
        <StatusBar backgroundColor={colors.primary}/>
        <CustomHeader title='Coingym'/>
        <FlatList
          data={this.props.mycoins}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}/>     

        {this.props.mycoins.length <= 1?
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
    mycoins: state.DashboardReducer.mycoins,
  }
)

export default connect(mapStateToProps, {})(Dashboard)

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
  }

})
