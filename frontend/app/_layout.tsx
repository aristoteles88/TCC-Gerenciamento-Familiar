import { AuthProvider } from '../services/auth/AuthContext';
import AppNavigator from '../navigation/AppNavigator';
import React from 'react';

const App = () => {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};

export default App;
// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { StatusBar } from 'expo-status-bar';
// import { useEffect } from 'react';
// import { initializeApp } from 'firebase/app';
// import 'react-native-reanimated';

// import { useColorScheme } from '@/hooks/useColorScheme';

// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

// const firebaseConfig = {
//   apiKey: "AIzaSyAiCg0VDUATwz0dKKsFhS0GrYpYqyVHQrc",
//   authDomain: "family-task-manager-51606.firebaseapp.com",
//   projectId: "family-task-manager-51606",
//   storageBucket: "family-task-manager-51606.firebasestorage.app",
//   messagingSenderId: "343002635950",
//   appId: "1:343002635950:web:3f6428c860026a45ca573f"
// };

// const app = initializeApp(firebaseConfig);

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//   });

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);

//   if (!loaded) {
//     return null;
//   }

//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <Stack>
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen name="+not-found" />
//       </Stack>
//       <StatusBar style="auto" />
//     </ThemeProvider>
//   );
// }
