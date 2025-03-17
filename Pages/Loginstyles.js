// styles.js
import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    position: 'absolute',
    top: '10%',
    resizeMode: 'contain',
  },
  logoRight: {
    width: 350,
    height: 350,
    position: 'absolute',
    top: '50%',
    right: "-45%",
    resizeMode: 'contain',
  },
  logoLeft: {
    width: 350,
    height: 350,
    position: 'absolute',
    top: '25%',
    right: "60%",
    resizeMode: 'contain',
  },
  blurContainer: {
    position: 'absolute',
    top: '30%',
    width: '80%',
    height: '50%',
    padding: 20,
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 20, // You can adjust this number to control the curve
    borderColor: '#aa883e',
    // backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: to add a slightly transparent white background
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    color: 'white',
    padding: 15,
    fontSize: 16,
  },
  passwordIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#aa883e',
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
