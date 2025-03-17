import React from 'react';
import { View, Image, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Hook for navigation
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import MaterialIcons for icons
import styles from './SideBarStyle'; // Importing styles from SidebarStyles.js

export default function Sidebar({ onClose }) {
  const navigation = useNavigation(); // Using the navigation hook

  return (
    <View style={styles.sidebarWrapper}>
      {/* TouchableWithoutFeedback only wraps the background to close when tapping outside */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.sidebarWrapper} />
      </TouchableWithoutFeedback>

      <View style={styles.sidebarContainer}>
        <View style={styles.sidebarHeader}>
          {/* Logo in the middle */}
          <Image
            source={require('../../assets/tradingSocietyLogo.png')} // Replace with your logo path
            style={styles.logo}
          />
        </View>
        <View style={styles.menuItems}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Home')} // Navigate to Add New Signal screen
          >
            <Icon name="add-circle" size={24} color="#ffffff" style={styles.menuItemIcon} />
            <Text style={styles.menuItemText}>Add New Signal</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('AllSignals')} // Navigate to All Signals screen
          >
            <Icon name="signal-cellular-alt" size={24} color="#ffffff" style={styles.menuItemIcon} />
            <Text style={styles.menuItemText}>Your Signals</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Setting')} // Navigate to Settings screen
          >
            <Icon name="settings" size={24} color="#ffffff" style={styles.menuItemIcon} />
            <Text style={styles.menuItemText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="logout" size={24} color="#ffffff" style={styles.menuItemIcon} />
            <Text style={styles.menuItemText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
