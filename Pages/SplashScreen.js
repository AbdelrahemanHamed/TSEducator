import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet, Animated } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const Splash = ({ navigation }) => {
  const shineAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shineAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(shineAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    const timer = setTimeout(() => {
      // Ensure the splash screen is not null
      if (SplashScreen) {
        SplashScreen.hide();  // Hide the splash screen
      }
      navigation.replace('Login');  // Navigate to the home screen
    }, 500);  // Change this time if needed

    return () => clearTimeout(timer);  // Cleanup timer
  }, [navigation]);

  const shineStyle = {
    opacity: shineAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 1],
    }),
    transform: [
      {
        translateX: shineAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [-200, 200],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/tradingSocietyLogo.png')} style={styles.logo} />
        <Animated.Text
          style={[styles.text, shineStyle]}>
          Welcome Eduactors
        </Animated.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c1c1c',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default Splash;
