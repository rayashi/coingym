import React from 'react'
import {
  StyleSheet,
  View,
  Image,
  StatusBar,
  Keyboard,
  FlatList,
  Slider
} from 'react-native'
import { 
  Text, 
  Button,
  Left,
  Right,
  Body,
  Fab,
  Icon,
  Card,
  CardItem,
  Container,
  Content
} from 'native-base'
import LinearGradient from 'react-native-linear-gradient'
import { connect } from 'react-redux'

import colors from '../styles/base'
import CustomHeader from '../shared/CustomHeader'


class Order extends React.Component {
  componentWillMount () {
    
  }

  _onBuy() {
    
  }

  _onSlide(value) {
    console.log(value)
  }

  render() {
    let { pair } = this.props.navigation.state.params

    return (
      <View style={{flex:1}}>
        <StatusBar backgroundColor={colors.primary}/>
        <CustomHeader title='Order'/>
        <Container style={{padding:8}}>
          <Content>
            <Card style={{padding:8}}>
              <CardItem>
                <Body>
                  <Text style={styles.ask}>How much {pair.paywith.name}s do you want yo spend?</Text>
                  <Slider value={1} width='100%'
                    maximumValue={10}
                    onSlidingComplete={value => this._onSlide.bind(this, value)}
                    step={1}/>
                  <Text style={{marginTop: 14}}> {pair.paywith.symbol}</Text>          
                </Body>
              </CardItem>
            </Card>
            <Card style={{padding:8}}>
              <CardItem>
                <Body>
                  <Text style={styles.ask}>How much {pair.buy.name}s do you want to buy?</Text>
                  <Slider value={1} width='100%'
                    maximumValue={10}
                    onSlidingComplete={value => this._onSlide.bind(this, value)}
                    step={1}/>
                  <Text style={{marginTop: 14}}> {pair.buy.symbol}</Text>          
                </Body>
              </CardItem>
            </Card>
          </Content>
        </Container>
        

      </View>
    )
  }
}

const mapStateToProps = state => (
  {

  }
)

export default connect(mapStateToProps, {})(Order)

const styles = StyleSheet.create({
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
  ask: {
    alignSelf:'center', 
    fontSize: 16, 
    fontWeight: 'bold', 
    marginBottom: 14
  }
})
