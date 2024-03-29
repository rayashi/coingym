import { StyleSheet } from 'react-native'

export const formsStyles = StyleSheet.create({
  input: {
    paddingVertical: 8,
    paddingHorizontal: 11,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontSize: 14,
    textAlignVertical: 'center',
    marginVertical: 5
  },
  inputBackgrounded: {
    paddingVertical: 6,
    paddingHorizontal: 11,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    fontSize: 14,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    marginVertical: 6
  },
  inputDate: {
    paddingVertical: 8,
    paddingHorizontal: 11,
    borderColor: 'gray', 
    borderWidth: 0.2,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    marginVertical: 5
  },
  button: {
    marginVertical: 5
  }
})