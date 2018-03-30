import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} from 'react-native'
import { 
  Icon,
} from 'native-base'

import { colors } from '../styles/base'
import HelpModal from '../help/HelpModal'

export default class CustomHeader extends Component {
  state = { helpModalVisible: false }

  _toggleHelp = () => {
    this.setState({helpModalVisible: !this.state.helpModalVisible})
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.left}>
          {this.props.leftIcon?
            <TouchableOpacity style={styles.leftButton} onPress={this.props.onLefButtonPress}>
              <Icon style={styles.leftIcon} name={this.props.leftIcon}/>
            </TouchableOpacity>          
          :null}
        </View>
        <View style={styles.middle}>
          <Text style={styles.title}>{this.props.title}</Text>
        </View>
        <View style={styles.right}>
          <TouchableOpacity onPress={this._toggleHelp}>
            <Icon style={styles.rightIcon} name='ios-help-circle-outline'/>
          </TouchableOpacity>
        </View>
        <HelpModal
          onclose={this._toggleHelp}
          visible={this.state.helpModalVisible}/>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    height: 60,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: colors.primary
  },
  title: {
    fontSize: 18,
    color: 'white',
    marginLeft: 15
  },
  button: {
    padding: 10
  },
  middle: {
    flex: 3,
    alignItems: 'center'
  },
  right: {
    justifyContent: 'flex-end'
  },
  rightIcon: {
    fontSize: 24,
    color: 'rgba(255,255,255,0.8)'
  },
  leftIcon: {
    fontSize: 28,
    color: 'white'
  },
  leftButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30
  }
})
