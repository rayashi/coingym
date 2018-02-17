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
  Body 
} from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'

import colors from '../styles/base'
import CustomHeader from '../shared/CustomHeader'

class Dashboard extends React.Component {
  _keyExtractor = (item, index) => item.id;
  
  _renderItem = ({item}) => (
    <ListItem>
      <Body>
        <Text >{item.id}{item.amount}</Text>
      </Body>
    </ListItem>
  )

  render() {
    return (
      <View>
        <StatusBar backgroundColor={colors.primary}/>
        <CustomHeader title='Coingym'/>
        <FlatList
          data={this.props.mycoins}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}/>     
    
        <Text style={styles.title}>Everyone starts from scratch</Text>
        <Text style={styles.text}>Now that you have some money, it’s time to buy crypto currencies. We will be your first exchange for learn, a place where you can buy and sell coins. </Text>
        <Text style={styles.text}>Touch here to start.</Text>
        <Image source={require('../../images/arrow.png')} resizeMode='contain' style={styles.arrow}/>
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
    width: 80,
    height: 130,
    alignSelf: 'center'


  }

})
