import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Alert } from '@/components/Alert';
import { useAuth } from '../../services/auth/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const { register, loading } = useAuth();

  const handleRegister = async () => {

    try {
      const fullName = `${firstName} ${lastName}`;
      await register(email, password, fullName, navigation);
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
                        style={[styles.button, styles.cancelButton]}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.button, styles.registerButton]}
                        onPress={() => {
                            handleRegister();
                        }}
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
        // width: '100%',
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
    button: {
        borderRadius: 10,
        width: 100,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    registerButton: {
        backgroundColor: 'blue',
    },
    cancelButton: {
        backgroundColor: '#5A5A5A',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default RegisterScreen;