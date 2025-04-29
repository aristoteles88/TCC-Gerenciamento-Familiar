import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../../services/auth/AuthContext';
import { useNavigation } from '@react-navigation/native';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const { resetPassword, loading } = useAuth();
  const navigation = useNavigation();

  const handleResetPassword = async ({navigation}) => {
    try {
      await resetPassword(email);
      Alert.alert('Success', 'Password reset email sent. Please check your inbox.');
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.subtitle}>Enter your email to receive a reset link</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Button title="Send Reset Link" onPress={handleResetPassword} disabled={loading} />
      <Text 
        style={styles.forgotLink} 
        onPress={() => navigation.goBack()}
      >
        Back to Login
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#D9D9D9',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: 250,
        height: 250,
        marginBottom: 30,
    },
    formContainer: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: 'D9D9D9',
        borderRadius: 20,
        padding: 25,
        elevation: 5,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: 400,
        backgroundColor: 'D9D9D9',
        borderRadius: 20,
        // padding: 25,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 25,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: '#f9f9f9',
    },
    registerButton: {
        backgroundColor: 'blue',
        borderRadius: 10,
        width: 100,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    loginButton: {
        backgroundColor: '#14AE5C',
        borderRadius: 10,
        width: 100,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    forgotLink: {
        color: '#6C63FF',
        textAlign: 'center',
        marginTop: 15,
        fontSize: 14,
    },
});
export default ForgotPasswordScreen;