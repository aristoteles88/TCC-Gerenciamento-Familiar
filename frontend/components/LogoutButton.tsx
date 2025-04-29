import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Alert } from '@/components/Alert';
import { logout } from '@/firebase';

const LogoutButton = ({navigation}) => {
    const handleLogout = async () => {
    
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Logout',
                    onPress: async () => {
                        const success = await logout();
                        if (success) {
                            navigation.replace( 'Login' );
                        }
                    },
                },
            ],
        );
    };

    return (
        <TouchableOpacity onPress={handleLogout} style={{ marginHorizontal: 15 }}>
            <Ionicons name="log-out" size={24} color="#6C63FF" />
        </TouchableOpacity>
    );
};

export default LogoutButton;