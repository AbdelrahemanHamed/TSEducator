import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Image, TouchableOpacity, Text, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './Loginstyles';  // Importing styles

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://laravelapi.tradingsociety.net/api/v1/instructor_login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      setLoading(false);
      
      if (data.status) {
        await AsyncStorage.setItem('authToken', data.token);
        await AsyncStorage.setItem('instructorData', JSON.stringify(data.instructor));
        navigation.navigate('Home');
      } else {
        Alert.alert('Login Failed', data.message || 'Invalid credentials');
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../assets/tradingSocietyLogo.png')} style={styles.logo} />
      
      {/* Blurred Login Box */}
      <BlurView intensity={50} tint="dark" style={styles.blurContainer}>
        {/* Email Input */}
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="email-outline" size={24} color="white" />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          {email.length > 0 && (
            <TouchableOpacity onPress={() => setEmail('')}>
              <Ionicons name="close-circle" size={20} color="white" />
            </TouchableOpacity>
          )}
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="lock-outline" size={24} color="white" />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <View style={styles.passwordIcons}>
            {password.length > 0 && (
              <TouchableOpacity onPress={() => setPassword('')}>
                <Ionicons name="close-circle" size={20} color="white" />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ marginLeft: 10 }}>
              <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'LOGIN'}</Text>
        </TouchableOpacity>
      </BlurView>
    </View>
  );
}
