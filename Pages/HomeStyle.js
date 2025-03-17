import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    Layout: {
      flex: 1,
      // padding: 20,
      backgroundColor: '#1c1c1c',
      paddingBottom: 50,
    },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1c1c1c',
    paddingTop: 120,
    paddingBottom: 50,
  },
  text: {
    color:"white",
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    placeholderTextColor:"white",  // Set placeholder color to green
    borderColor: '#aa883e',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15,
    color: '#fff',  // Text color inside input
    backgroundColor: '#1f1f1f',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#aa883e',
  },
  pairList: {
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
  },
  pairItem: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#aa883e',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
