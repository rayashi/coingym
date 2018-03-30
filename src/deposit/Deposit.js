import { colors } from '../styles/base'
import { formsStyles } from '../styles/forms'
import { deposit } from './DepositActions'
import { Button, Text } from 'native-base'
import React from 'react'
import {
  Image,
  Keyboard,
  StatusBar,
  StyleSheet,
  TextInput,
  View,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'
import { Toast } from 'native-base'

class Deposit extends React.Component {
  static navigationOptions = { header: null }

  constructor(props) {
    super(props)
    this.state = { keyboard:false }
  }

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => this.setState({ keyboard:true }))
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => this.setState({ keyboard:false }))
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  _makeDeposit = () => {
    if (!this.state.value){
      Toast.show({
        text: 'Please type some value to deposit',
        type: 'danger',
        position: 'bottom',
        buttonText: 'OK',
        duration: 2500
      })
    }else if (this.state.value > this.props.config.depositMaximumValue) {
      Toast.show({
        text: `Sorry the maximum value for deposit is ${this.props.depositMaximumValue}`,
        type: 'danger',
        position: 'bottom',
        buttonText: 'OK',
        duration: 2500
      })
    } else {
      Keyboard.dismiss()
      deposit(this.state.value)
      this.props.navigation.navigate('Dashboard')
    }
  }

  render() {
    return (
      <LinearGradient colors={colors.gradient}
        style={styles.mainContent}>
        <StatusBar backgroundColor={colors.primary}/>
        {!this.state.keyboard?
          <View style={styles.hiddenContent}>
            <Image source={ require('../../images/saving.png')} style={styles.image}/>
            <Text style={styles.title}>Let’s Start?</Text>
            <Text style={styles.text}>To start investing you need make your first deposit,
              <Text style={styles.boldText}> relax this is not a real money.</Text></Text>
            <Text style={styles.text}>After that you will be able to buy cryptocoins</Text>
          </View>
        :null}
        <Text style={styles.label}>Initial deposit value in dollar</Text>
        <TextInput
          onChangeText={(val) => this.setState({ value: Number(val) })}
          width={'100%'}
          style={formsStyles.inputBackgrounded}
          keyboardType='numeric'
          placeholder={'USD 30,000.00'}
          underlineColorAndroid='rgba(0, 0, 0, 0)'
          onSubmitEditing={this._makeDeposit}
          maxLength={8}/>

        <Button block rounded bordered light style={styles.button} onPress={this._makeDeposit}>
          <Text>Make my first deposit</Text>
        </Button>
      </LinearGradient>
    )
  }
}

const mapStateToProps = state => ({
  value: state.DepositReducer.value,
  config: state.LoadingReducer.config
})

export default connect(mapStateToProps, {})(Deposit)

const styles = StyleSheet.create({
  image: {
    width: 180,
    height: 180
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 20,
    fontSize: 18
  },
  boldText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  title: {
    paddingHorizontal: 18,
    fontSize: 28,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginVertical: 16
  },
  mainContent: {
    padding:10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  hiddenContent: {
    alignItems: 'center',
    justifyContent: 'center'
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
