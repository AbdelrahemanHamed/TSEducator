// components/HeaderStyles.js
import { StyleSheet, StatusBar } from 'react-native';

export const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 100, // Height of the top bar
    backgroundColor: '#000',
    position: 'absolute', // Ensure it stays at the top
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10, // Keeps it above other components
    paddingTop: StatusBar.currentHeight, // Avoids overlap with StatusBar
  },
  logo: {
    width: 120,
    height: 60,
    resizeMode: 'contain',
  },
  logoutButton: {
    padding: 10,
  },
});
