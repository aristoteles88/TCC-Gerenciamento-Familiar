import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "@/services/auth/AuthContext";
import { UserCard, RewardCard } from "@/components/RewardCard";

const RewardsContent = () => {
  const { user } = useAuth();
  
  return <View style={styles.content}>
    <Text style={styles.pageTitle}>Recompensas</Text>
    <View style={styles.cards}>
      <UserCard userId='2' title="Pedro Silva" points={150} />
      <View style={styles.rewards}>
        <RewardCard title="Cinema" points={20} isClaimed={false} />
        <RewardCard title="Cinema" points={20} isClaimed={false} />
        <RewardCard title="Cinema" points={20} isClaimed={false} />
        <RewardCard title="Cinema" points={20} isClaimed={false} />
        <RewardCard title="Cinema" points={20} isClaimed={false} />
        <RewardCard title="Cinema" points={20} isClaimed={false} />
        <RewardCard title="Cinema" points={20} isClaimed={false} />
        <RewardCard title="Cinema" points={20} isClaimed={false} />
        <RewardCard title="Cinema" points={20} isClaimed={false} />
        <RewardCard title="Cinema" points={20} isClaimed={false} />
        <RewardCard title="Cinema" points={20} isClaimed={false} />
        <RewardCard title="Cinema" points={20} isClaimed={false} />
      </View>
    </View>
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
  pageTitle: {
    justifyContent: 'center',
    fontSize: 36,
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingVertical: 20,
  },
  cards: {
    alignItems: 'center'
  },
  rewards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
});

export default RewardsContent;