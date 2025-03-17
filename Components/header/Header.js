// components/Header.js
import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './HeaderStyles'; // Importing styles
import Sidebar from '../sideBarMenu/SideBar'; // Import the Sidebar component

export default function Header({ onLogout }) {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
      {/* StatusBar to overlay the top bar */}
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <View style={styles.headerContainer}>
        {/* Logo in the middle */}
        <Image
          source={require('../../assets/tradingSocietyLogo.png')} // Replace with your logo path
          style={styles.logo}
        />
        {/* Sidebar button on the left */}
        <TouchableOpacity onPress={toggleSidebar} style={styles.logoutButton}>
          <Ionicons name="menu-outline" size={30} color="white" />
        </TouchableOpacity>


 
      </View>

      {/* Render Sidebar if visible */}
      {isSidebarVisible && <Sidebar onClose={toggleSidebar} />}
    </>
  );
}
