import React from 'react'
import {
  StyleSheet,
  View,
  Image,
  StatusBar,
  Keyboard,
  TextInput,
} from 'react-native'
import { Text, Button } from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'

import { formsStyles } from '../styles/forms'
import { setValue } from './DepositActions'

class Deposit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {keyboard:false}
  }
  
  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => this.setState({keyboard:true}))
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => this.setState({keyboard:false}))
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  _makeDeposit(){
    this.props.navigation.navigate('Dashboard')
  }

  render() {
    return (
      <LinearGradient colors={['#5691c8', '#267871']} 
        style={styles.mainContent}>
        <StatusBar backgroundColor="#5691c8"/>
        {!this.state.keyboard?
          <View style={styles.hiddenContent}>
            <Image source={ require('../../images/saving.png')} style={styles.image}/>
            <Text style={styles.title}>Let's Start?</Text>
            <Text style={styles.text}>To start investing you need make your first deposit, 
              <Text style={styles.boldText}> relax this is not a real money.</Text></Text>
            <Text style={styles.text}>After that you will be able to buy cryptocoins</Text>
          </View>
        :null}
        <Text style={styles.label}>Initial deposit value in dollar</Text>
        <TextInput
          onChangeText={(text) => this.props.setValue(text)}
          width={'100%'}
          style={formsStyles.inputBackgrounded}
          value={this.state.value}
          keyboardType='numeric'
          placeholder={'USD 30,000.00'} 
          underlineColorAndroid='rgba(0, 0, 0, 0)'/>

        <Button block rounded bordered light style={styles.button} onPress={this._makeDeposit.bind(this)}>
          <Text>Make my first deposit</Text>
        </Button>
      </LinearGradient>
    )
  }
}

const mapStateToProps = state => (
  {
    value: state.DepositReducer.value,
  }
)

export default connect(mapStateToProps, {setValue})(Deposit)

const styles = StyleSheet.create({
  image: {
    width: 180,
    height: 180,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
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
    fontSize: 28,
    color: 'white',
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
  hiddenContent: {
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

})
