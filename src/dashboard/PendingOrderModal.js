import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Modal
} from 'react-native'
import {
  Text,
  Button
} from 'native-base'

export default class PendingOrderModal extends Component {
  render() {
    return (
      <Modal
        animationType='slide'
        transparent={true}
        visible={this.props.visible}
        onRequestClose={() => null}>
        <View style={styles.modal}>
          <View>
            <Text style={styles.msg}>
              This order is still pending execution,
              it means you have to either cancel or wait for it to be executed.
            </Text>
            <View style={styles.buttons}>
              <Button rounded light danger
                onPress={this.props.oncancel}>
                <Text style={{color:'white'}}>Cancel order</Text>
              </Button>
              <Button rounded light success
                onPress={this.props.onwait}>
                <Text style={{color:'white'}}>Keep waiting</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    alignItems: 'center',
    flexDirection: 'column',
    padding: 16,
    marginHorizontal: 14,
    marginTop: 200,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 6
  },
  msg: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 12,
    marginTop: 12
  },
  image: {
    width: 30,
    height: 30
  },
  iconsLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
})
