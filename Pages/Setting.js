import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { styles } from "./SettingStyle"; // Importing the styles
import Header from "../Components/header/Header"; // Importing Header component

export default function Setting() {
  const [userName, setUserName] = useState("John Doe"); // Example data
  const [email, setEmail] = useState("johndoe@example.com"); // Example data
  const [oldPassword, setOldPassword] = useState(""); // Old password
  const [newPassword, setNewPassword] = useState(""); // New password
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm password
  const [profileImage, setProfileImage] = useState(null); // Profile image state

  // Function to handle profile image change (for demonstration purposes)
  const handleImageChange = () => {
    Alert.alert("Change Profile Image", "You can choose a new profile image here.");
    // You can implement actual image picker functionality here.
  };

  // Function to handle password change
  const handlePasswordChange = () => {
    if (oldPassword.length < 6) {
      Alert.alert("Error", "Old password must be at least 6 characters long.");
    } else if (newPassword.length < 6) {
      Alert.alert("Error", "New password must be at least 6 characters long.");
    } else if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New password and confirm password do not match.");
    } else {
      Alert.alert("Password Changed", "Your password has been successfully updated.");
      setOldPassword(""); // Reset old password field
      setNewPassword(""); // Reset new password field
      setConfirmPassword(""); // Reset confirm password field
    }
  };

  // Function to handle account deletion
  const handleAccountDeletion = () => {
    Alert.alert("Delete Account", "Are you sure you want to delete your account?", [
      {
        text: "Cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          Alert.alert("Account Deleted", "Your account has been deleted successfully.");
        },
      },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#121212" }}>
      <Header onLogout={() => {}} />
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "#121212" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={{ paddingBottom: 0 }} keyboardShouldPersistTaps="handled">
          <View style={[styles.container, { backgroundColor: '#121212' }]}>
            <Text style={[styles.header, { color: '#ffffff' }]}>Settings</Text>

            {/* Profile Image */}
            <TouchableOpacity onPress={handleImageChange}>
              <View style={styles.profileImageContainer}>
                <Image
                  source={profileImage ? { uri: profileImage } : require("../assets/tradingSocietyLogo.png")}
                  style={styles.profileImage}
                />
                <Text style={[styles.changeImageText, { color: '#ffffff' }]}>Change Profile Image</Text>
              </View>
            </TouchableOpacity>

            {/* User Name */}
            <Text style={[styles.label, { color: '#ffffff' }]}>Name</Text>
            <TextInput
              style={[styles.input, { backgroundColor: '#333333', color: '#ffffff' }]}
              value={userName}
              onChangeText={setUserName}
            />

            {/* Email */}
            <Text style={[styles.label, { color: '#ffffff' }]}>Email</Text>
            <TextInput
              style={[styles.input, { backgroundColor: '#333333', color: '#ffffff' }]}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            {/* Old Password */}
            <Text style={[styles.label, { color: '#ffffff' }]}>Old Password</Text>
            <TextInput
              style={[styles.input, { backgroundColor: '#333333', color: '#ffffff' }]}
              value={oldPassword}
              onChangeText={setOldPassword}
              secureTextEntry
              placeholder="Old Password"
              placeholderTextColor="#aaa"
            />

            {/* New Password */}
            <Text style={[styles.label, { color: '#ffffff' }]}>New Password</Text>
            <TextInput
              style={[styles.input, { backgroundColor: '#333333', color: '#ffffff' }]}
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              placeholder="New Password"
              placeholderTextColor="#aaa"
            />

            {/* Confirm New Password */}
            <Text style={[styles.label, { color: '#ffffff' }]}>Confirm New Password</Text>
            <TextInput
              style={[styles.input, { backgroundColor: '#333333', color: '#ffffff' }]}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              placeholder="Confirm New Password"
              placeholderTextColor="#aaa"
            />

            {/* Change Password Button */}
            <TouchableOpacity style={styles.button} onPress={handlePasswordChange}>
              <Text style={styles.buttonText}>Change Password</Text>
            </TouchableOpacity>

            {/* Delete Account */}
            <TouchableOpacity style={styles.deleteButton} onPress={handleAccountDeletion}>
              <Text style={styles.deleteButtonText}>Delete Account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
