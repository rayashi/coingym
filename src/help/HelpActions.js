import { Linking } from 'react-native'
import firebase from 'react-native-firebase'

const database = firebase.firestore()

export const getRandomAgent = () => {
  return async dispatch => {
    dispatch({ type: 'loading_help', payload: true })
    let snapshot = await database.collection('team').get()
    const index = Math.floor((Math.random() * snapshot.size)) 
    const agent = snapshot.docs[index].data()
    dispatch({ type: 'set_agent', payload: agent })
    dispatch({ type: 'loading_help', payload: false })
  }
}

export const sendMessage = (agent, msg) => {
  Linking.openURL(`whatsapp://send?text=${msg}&phone=${agent.phone}`)
}
