import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Image,
  Modal
} from 'react-native'
import {
  Text,
  Icon,
  Button
} from 'native-base'

export default class UnavailableModal extends Component {
  render() {
    if(!this.props.market) return null
    return (
      <Modal
        animationType='slide'
        transparent={true}
        visible={this.props.visible}
        onRequestClose={() => null}>
        <View style={styles.modal}>
          <View>
            <View style={styles.iconsLine}>
              <Image style={styles.image} 
                source={{ uri: this.props.market.base.image }}/> 
              <Icon name='ios-swap' size={32}/>
              <Image style={styles.image} 
                source={{ uri: this.props.market.quote.image }}/> 
            </View>    
            
            <Text style={styles.msg}>
              You can’t buy {this.props.market.base.id.toUpperCase()} paying 
              with {this.props.market.quote.id.toUpperCase()}, because you 
              dont have {this.props.market.quote.id.toUpperCase()}.
              Please get some {this.props.market.quote.id.toUpperCase()} first!
            </Text>
            <Button block rounded light success 
              onPress={this.props.onclose}>
              <Text style={{color:'white'}}> Ok</Text>
            </Button>
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
  }
})

