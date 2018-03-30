import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Image,
  Modal,
  TextInput
} from 'react-native'
import {
  Text,
  Button
} from 'native-base'
import { connect } from 'react-redux'

import { getRandomAgent, sendMessage } from './HelpActions'
import { formsStyles } from '../styles/forms'

class HelpModal extends Component {
  state = {userMsg: ''}

  componentDidMount() {
    if(!this.props.agent) this.props.getRandomAgent()
  }

  _onSendMessage = () => {
    if(!this.props.agent) return null
    this.props.onclose()
    sendMessage(this.props.agent, this.state.userMsg)
  }

  render() {
    if(!this.props.agent) return null

    return (
      <Modal
        animationType='slide'
        transparent={true}
        visible={this.props.visible}
        onRequestClose={() => null}>
        <View style={styles.modal} >
          <View style={styles.modalBody} >
          <View style={styles.messageLine}>
            <Image style={styles.agentPicture} 
              source={{ uri: this.props.agent.picture }}/> 
            <Text style={styles.msg}>
              Hi! my name is {this.props.agent.name}, 
              I’m {this.props.agent.role} of Coingym, 
              how can I improve your experience?
            </Text>
          </View>
          <TextInput
            blurOnSubmit
            autoFocus
            onChangeText={(userMsg) => this.setState({userMsg})}
            placeholder={'Type here your message'}
            style={formsStyles.input}
            underlineColorAndroid='rgba(0, 0, 0, 0)'
            onSubmitEditing={this._onSendMessage}/>
          <View style={styles.buttonsLine}>
            <Button style={styles.cancelButton} block rounded light
              onPress={this.props.onclose}>
              <Text style={styles.cancelButtonText}> No, thanks </Text>          
            </Button>
            <Button style={styles.sendButton} block rounded light success
              onPress={this._onSendMessage}>
              <Text style={styles.buttonText}> Send </Text>          
            </Button>
          </View>
          </View>
        </View>
      </Modal>
    )
  }
}


const mapStateToProps = state => (
  {
    loading: state.HelpReducer.loading,
    agent: state.HelpReducer.agent
  }
)

export default connect(mapStateToProps, {
  getRandomAgent
})(HelpModal)

const styles = StyleSheet.create({
  modal: {
    flexDirection: 'column',
    padding: 16,
    marginHorizontal: 14,
    marginTop: 100,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 6
  },
  msg: {
    paddingHorizontal: 10,    
    fontSize: 17
  },
  agentPicture: {
    width: 60, 
    height: 60,
    borderRadius: 30
  },
  messageLine: {
    width: '83%',
    flexDirection: 'row',
    marginBottom: 10
  },
  cancelButton: {
    flex: 2,
    marginRight: 10
  },
  sendButton: {
    flex: 3,
  },
  buttonText: {
    color:'white'
  },
  buttonsLine: {
    flexDirection: 'row',
    marginTop: 10
  },
  cancelButtonText: {
    color: 'gray'
  }
})

