import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UserCard = ({userId, title, points}) => {
    const getAvatar = (id: string) => {
        const avatars = {
          '1': require('@/assets/images/avatar_mom.png'),
          '2': require('@/assets/images/avatar_dad.png'),
          '3': require('@/assets/images/avatar_boy.png'),
          '4': require('@/assets/images/avatar_girl.png'),
        };
        return avatars[id];
    };
    return (
        <TouchableOpacity style={[styles.card, styles.userCard]}>
        {/* circulo com imagem do card */}
            <View style={styles.circle}>
                <Image 
                    source={getAvatar(userId)} 
                    style={styles.userAvatar}
                />
            </View>
            
            {/* Título do card */}
            <Text style={styles.title}>{title}</Text>
            
            {/* linha da primeira informacao */}
            <View style={styles.row}>
                <Ionicons 
                name={"checkmark-circle-outline"} 
                size={20} 
                color={"#006300"} 
                />
                <Text style={styles.text}>{5} Tarefas concluídas em 'mês'</Text>
            </View>
            
            {/* linha da segunda informacao */}
            <View style={styles.row}>
                <Ionicons name="star" size={20} color="#FFD700" />
                <Text style={styles.text}>{points} pontos</Text>
            </View>
        </TouchableOpacity>
    );
}

const RewardCard = ({ title, points, isClaimed }) => {
    return (
        <TouchableOpacity style={[styles.card, styles.rewardCard]}>
            {/* circulo com imagem do card */}
            <View style={styles.circle}>
                <Ionicons name="gift" size={24} color="#6C63FF" />
            </View>
            
            {/* Título do card */}
            <Text style={styles.title}>{title}</Text>
            
            {/* linha da primeira informacao */}
            <View style={styles.row}>
                <Text style={styles.text}>Ingresso + Pipoca</Text>
            </View>
            
            {/* linha da segunda informacao */}
            <View style={styles.row}>
                <Ionicons name="star" size={20} color="#FFD700" />
                <Text style={styles.text}>{points} Pontos</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    margin: 10,
  },
  userCard: {
    width: 400,
    height: 200,
  },
  rewardCard: {
    width: 186,
    height: 191,
  },
  circle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5
  },
  userAvatar: {
    width: 62,
    height: 62,
    borderRadius: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginLeft: 8,
  },
});

export { UserCard, RewardCard };

// Example usage:
// <RewardCard title="Movie Night" points={150} isClaimed={false} />