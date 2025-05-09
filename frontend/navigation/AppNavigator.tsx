import React, { useState } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';
import FamilyGroupScreen from '../screens/Users/FamilyGroupScreen';
import HomeScreen from '../screens/HomeScreen';

const AppStack = createNativeStackNavigator();

const AppNavigator = () => {

  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
          <AppStack.Screen name="Home" component={HomeScreen} />
          <AppStack.Screen name="FamilyGroup" component={FamilyGroupScreen} />
          <AppStack.Screen name="Login" component={LoginScreen} />
          <AppStack.Screen name="Register" component={RegisterScreen} />
          <AppStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />  
    </AppStack.Navigator>
  )
};

const App = () => {
  return <AppNavigator/>;
};

export default App;
