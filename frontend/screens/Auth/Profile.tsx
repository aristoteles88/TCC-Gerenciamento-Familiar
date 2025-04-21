import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProfileContent = () => (
  <View style={styles.content}>
    <Text style={styles.contentTitle}>Profile Page</Text>
    {/* Your tasks content here */}
  </View>
);

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