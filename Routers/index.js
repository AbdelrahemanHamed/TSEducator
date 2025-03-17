import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from '../Pages/SplashScreen'; // Assuming you created a SplashScreen component
import HomeScreen from '../Pages/Home'; // Your home screen component
import LoginScreen from '../Pages/Login'; // Your login screen component
import AllSignals from '../Pages/AllSignals'; 
import EditSignal from '../Pages/EditSignals'; 
import Setting from '../Pages/Setting'; 

const Stack = createStackNavigator();

const Routes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Track if user is authenticated

  useEffect(() => {
    const checkAuthStatus = async () => {
      const authToken = await AsyncStorage.getItem('authToken');
      if (authToken) {
        setIsAuthenticated(true); // User is logged in
      } else {
        setIsAuthenticated(false); // User is not logged in
      }
    };

    checkAuthStatus();
  }, []); // Empty dependency array ensures it runs only once when the component is mounted

  if (isAuthenticated === null) {
    // You can show a loading screen while checking authentication status
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuthenticated ? 'Login' : 'Login'} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AllSignals" component={AllSignals} />
        <Stack.Screen name="EditSignal" component={EditSignal} />
        <Stack.Screen name="Setting" component={Setting} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
