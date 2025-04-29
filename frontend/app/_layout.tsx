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
