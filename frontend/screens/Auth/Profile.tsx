import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "@/services/auth/AuthContext";
import { useNavigation } from "@react-navigation/native";
import LogoutButton from "@/components/LogoutButton";

const ProfileContent = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  return <View style={styles.content}>
    <Text style={styles.contentTitle}>Profile Page</Text>
    <Text> { user?.email } </Text>
    <LogoutButton navigation={navigation}/>
  </View>
};

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
  },
  contentArea: {
    flex: 1,
    padding: 15,
  },
  content: {
    flex: 1,
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ProfileContent;