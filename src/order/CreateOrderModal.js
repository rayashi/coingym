import React from 'react'

import {
  Modal,
  View,
  StyleSheet,
  Dimensions
} from 'react-native'

import {
  Icon,
  Button,
  Text
} from 'native-base'

import { colors } from '../styles/base'

const CreateOrderModal = (props) => {
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={props.visible}
      onRequestClose={() => {
        alert('Modal has been closed.');
      }}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Icon name='ios-checkmark-circle' style={styles.icon}/>
          <Text style={styles.h1}>Your order has been successfully created</Text>
          <Text style={styles.h2}>Now you can follow its status on the funds screen</Text>
          <Button light block rounded bordered style={styles.button} onPress={props.onClose}>
            <Text>Go back to your Funds</Text>
          </Button>
        </View>
      </View>
    </Modal>
  )
}

const {width, height} = Dimensions.get('window')

const proportionalWidth = (value: string): number => {
    return width * ((parseFloat(value.replace('%', ''))) / 100)
}

const proportionalHeight = (value: string): number => {
    return height * ((parseFloat(value.replace('%', ''))) / 100)
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: proportionalWidth('100%'),
    height: proportionalHeight('100%'),
    backgroundColor: '#fff'
  },
  content: {
    width: proportionalWidth('90%'),
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    color: '#43c3a7',
    fontSize: 120
  },
  h1: {
    marginTop: 10,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  h2: {
    marginTop: 15,
    fontSize: 18,
    textAlign: 'center',
    color: '#999'
  },
  button: {
    marginTop: 200,
    backgroundColor: colors.primary,
    bottom: 0
  }
})

export default CreateOrderModal
