import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useAuth } from '../../services/auth/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const { register, loading } = useAuth();
  const navigation = useNavigation();

  const handleRegister = async () => {

    try {
      await register(email, password);
    } catch (error: any) {
      Alert.alert('Registration Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.background}>
        <View style={styles.container}>
            <View>
                <Image
                    source={require('@/assets/images/logo.png')}
                    style={styles.logo}
                />
            </View>
            <View>
                <Text style={styles.title}>Registro</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Nome"
                    value={firstName}
                    onChangeText={setFirstName}
                    autoCapitalize='words'
                />
                <TextInput
                    style={styles.input}
                    placeholder="Sobrenome"
                    value={lastName}
                    onChangeText={setLastName}
                    autoCapitalize='words'
                />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity 
                        style={styles.cancelButton}
                        onPress={() => navigation.navigate('Login')}
                        disabled={loading}
                    >
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.registerButton}
                        onPress={() => navigation.navigate('Register')}
                    >
                        <Text style={styles.buttonText}>Registrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.logo}></View>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#D9D9D9',
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: 250,
        height: 250,
        marginBottom: 30,
        marginHorizontal: 100,
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
        marginBottom: 50,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 25,
        textAlign: 'center',
    },
    input: {
        width: 300,
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
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    cancelButton: {
        backgroundColor: '#5A5A5A',
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
    loginButton: {
        color: '#6C63FF',
        textAlign: 'center',
        marginTop: 15,
        fontSize: 14,
    },
});

export default RegisterScreen;