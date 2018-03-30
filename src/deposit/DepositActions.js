import firebase from 'react-native-firebase'
import Appsee from 'react-native-appsee'

export const deposit = async (value) => {
  var user = firebase.auth().currentUser

  await firebase.firestore()
    .collection('users')
    .doc(`${user.uid}`)
    .collection('funds')
    .doc('usd')
    .set({
      amount : Number(value),
      amountInOrder: 0,
      fiat : true,
      image : 'https://firebasestorage.googleapis.com/v0/b/coingym.appspot.com/o/cryptos%2Fusd.png?alt=media&token=afaa1c1d-4c87-4418-afcd-fe37d9da8928',
      name : 'Dollar',
      precision : 2,
      pending: false
    })

    Appsee.addEvent('Deposit', { value })
}
