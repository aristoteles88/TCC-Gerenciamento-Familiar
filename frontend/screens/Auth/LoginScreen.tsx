import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Alert } from '@/components/Alert';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { useAuth } from '../../services/auth/AuthContext';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading } = useAuth();

    const webClientId = "343002635950-2qjmdgaml08o5pbao3uf645fum6vq4lr.apps.googleusercontent.com"; 

    useEffect(()=>{
        GoogleSignin.configure({
            webClientId: webClientId,
        })
    },[])

    const handleLogin = async (type, email, password, navigation) => {
        try {
            await login(type, email, password, navigation);
        } catch (error: any) {
            Alert.alert('Erro ao fazer o login: ', error.message);
        }
    };

  return (
    <ScrollView
      style={styles.background}>
      <View style={styles.container}>
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logo}
        />

        <View style={styles.formContainer}>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            autoCapitalize='none'
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <View style={styles.buttonsContainer}>
            <TouchableOpacity 
                style={styles.registerButton}
                onPress={() => navigation.navigate('Register')}
            >
                <Text style={styles.buttonText}>Registrar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.loginButton}
                onPress={() => handleLogin('email', email, password, navigation)}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            onPress={() => handleLogin('google', email, password, navigation)}
          >
              <Image
                  source={require('@/assets/images/web_light_sq_SI1x.png')}
                  style={styles.googleButton}
              />
          </TouchableOpacity>
          
          <TouchableOpacity>
            <Text 
                style={styles.forgotPassword}
                onPress={() => navigation.navigate('ForgotPassword')}
            >
                Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

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
    height: 56,
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  registerButton: {
    backgroundColor: 'blue',
    borderRadius: 10,
    width: 100,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: '#14AE5C',
    borderRadius: 10,
    width: 100,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  googleButton: {
    borderRadius: 10,
    width: 350,
    height: 80,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#6C63FF',
    textAlign: 'center',
    marginTop: 15,
    fontSize: 14,
  },
});

export default LoginScreen;