import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

const MainSettingsButton = ({option, setCurrentView,  setSelectedOption}) => {
    return (
        <TouchableOpacity
            key={option.id}
            style={styles.option}
            onPress={() => {
            setSelectedOption(option.id);
            setCurrentView('sub');
            }}
        >
            <Ionicons name={option.icon} size={24} color="#6C63FF" />
            <Text style={styles.optionText}>{option.title}</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
    );
}

const SubSettingsButton = ({option}) => {
    return (
        <TouchableOpacity 
            key={option.id} 
            style={styles.option}>
            <Text style={styles.optionText}>{option.title}</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
      },
      optionText: {
        flex: 1,
        fontSize: 16,
        marginLeft: 15,
      },
})

export { MainSettingsButton, SubSettingsButton };