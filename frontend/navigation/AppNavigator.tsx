import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';
import FamilyGroupScreen from '../screens/Users/FamilyGroupScreen';
import HomeScreen from '../screens/HomeScreen';
import { useAuth } from '../services/auth/AuthContext';

// Stacks
// const AuthStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();

// const AuthNavigator = () => (
//   <AuthStack.Navigator
//     screenOptions={{
//       headerShown: false,
//     }}
//   >
//     <AuthStack.Screen name="Login" component={LoginScreen} />
//     <AuthStack.Screen name="Register" component={RegisterScreen} />
//     <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
//   </AuthStack.Navigator>
// );

const AppNavigator = () => (
  <AppStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <AppStack.Screen name="Login" component={LoginScreen} />
    <AppStack.Screen name="Register" component={RegisterScreen} />
    <AppStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <AppStack.Screen name="FamilyGroup" component={FamilyGroupScreen} />
    <AppStack.Screen name="Home" component={HomeScreen} />
  </AppStack.Navigator>
);

const App = () => {
  const { user, loading } = useAuth();

  if (loading) {
    // return <LoadingScreen />; // Create a simple loading component
  }
  return <AppNavigator/>;
  // return user ? <AppNavigator /> : <AuthNavigator />;
  // return (
  //   <Stack.Navigator
  //     screenOptions={{
  //       headerShown: false,
  //     }}
  //   >
  //     {user ? (
  //       <>
  //         <Stack.Screen name="FamilyGroup" component={FamilyGroupScreen} />
  //         <Stack.Screen name="Home" component={HomeScreen}/>
  //       </>
  //     ) : (
  //       <>
  //         <Stack.Screen name="Login" component={LoginScreen} />
  //         <Stack.Screen name="Register" component={RegisterScreen} />
          
  //       </>
  //     )}
  //   </Stack.Navigator>
  // );
};

export default App;
