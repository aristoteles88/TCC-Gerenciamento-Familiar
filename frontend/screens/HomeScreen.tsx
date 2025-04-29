import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TasksContent from './Main/Tasks';
import RewardsContent from './Main/Rewards';
import SettingsContent from './Main/Settings';
import ProfileContent from './Auth/Profile';
import LogoutButton from '@/components/LogoutButton';


const HomeScreen = ({navigation}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeContent, setActiveContent] = useState('tasks'); // 'tasks', 'rewards', 'settings', 'profile'

  // Animacao da sidebar
  const sidebarWidth = useState(new Animated.Value(200))[0];

  const toggleSidebar = () => {
    Animated.timing(sidebarWidth, {
      toValue: sidebarCollapsed ? 200 : 60,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const renderContent = () => {
    switch (activeContent) {
      case 'tasks':
        return <TasksContent />;
      case 'rewards':
        return <RewardsContent />;
      case 'settings':
        return <SettingsContent />;
      case 'profile':
        return <ProfileContent />;
      default:
        return <TasksContent />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Sidebar */}
      <Animated.View style={[styles.sidebar, { width: sidebarWidth }]}>
        <TouchableOpacity 
          style={styles.sidebarToggle} 
          onPress={toggleSidebar}
        >
          <Ionicons 
            name={sidebarCollapsed ? 'chevron-forward' : 'chevron-back'} 
            size={24} 
            color="#6C63FF" 
          />
        </TouchableOpacity>

        <View style={styles.sidebarButtons}>
          <TouchableOpacity 
            style={styles.sidebarButton}
            onPress={() => setActiveContent('tasks')}
          >
            <Ionicons name="list" size={24} color="#6C63FF" />
            {!sidebarCollapsed && <Text style={styles.sidebarButtonText}>Tasks</Text>}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.sidebarButton}
            onPress={() => setActiveContent('rewards')}
          >
            <Ionicons name="gift" size={24} color="#6C63FF" />
            {!sidebarCollapsed && <Text style={styles.sidebarButtonText}>Rewards</Text>}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.sidebarButton}
            onPress={() => setActiveContent('settings')}
          >
            <Ionicons name="settings" size={24} color="#6C63FF" />
            {!sidebarCollapsed && <Text style={styles.sidebarButtonText}>Settings</Text>}
          </TouchableOpacity>
        </View>
      </Animated.View>
      <View style={styles.mainContent}>
        {/* Navbar */}
        <View style={styles.navbar}>
          <Text style={styles.navbarTitle}>Make it Better</Text>
          <View style={styles.navbarButtons}>
            <TouchableOpacity 
              style={styles.navbarButton}
              onPress={() => setActiveContent('profile')}
            >
              <Ionicons name="person" size={24} color="#6C63FF" />
            </TouchableOpacity>
            <LogoutButton navigation={navigation}/>
          </View>
        </View>

        {/* Area Principal */}
        <View style={styles.contentArea}>
          {renderContent()}
        </View>
      </View>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  navbar: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  navbarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  navbarButtons: {
    flexDirection: 'row',
  },
  navbarButton: {
    marginLeft: 15,
  },
  mainContent: {
    flex: 1,
  },
  sidebar: {
    backgroundColor: '#f8f8f8',
    borderRightWidth: 1,
    borderRightColor: '#eee',
  },
  sidebarToggle: {
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sidebarButtons: {
    paddingTop: 20,
  },
  sidebarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  sidebarButtonText: {
    marginLeft: 10,
    color: '#333',
  },
  contentArea: {
    flex: 1,
    padding: 15,
  },
});

export default HomeScreen;