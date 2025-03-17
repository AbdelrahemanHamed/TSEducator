import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  sidebarWrapper: {
    flex: 1,
    backgroundColor: 'rgba(8, 8, 8, 0.5)', // Dark background for the sidebar overlay
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
  sidebarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '60%',
    height: '100%',
    backgroundColor: '#333',
    paddingTop: 50,
    paddingLeft: 20,
    zIndex: 1000,
    flexDirection: 'column', // Align items vertically
    alignItems: 'center',
  },
  sidebarHeader: {
    flexDirection: 'row', // Align items horizontally
    justifyContent: 'center', // Center the logo horizontally
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100, // Adjust the logo size as per your requirement
    height: 100, // Adjust the logo size as per your requirement
  },
  menuItems: {
    marginTop: 20,
    width: '100%',
  },
  menuItem: {
    flexDirection: 'row', // Align icon and text horizontally
    alignItems: 'center',
    marginBottom: 15,
  },
  menuItemText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10, // Space between icon and text
  },
  menuItemIcon: {
    marginRight: 10, // Space between icon and text
  },
  closeButton: {
    backgroundColor: '#ff0000',
    padding: 10,
    borderRadius: 50,
    marginTop: 20, // Add some margin to the close button
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
