import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

import { MainSettingsButton, SubSettingsButton } from "@/components/SettingsButton";

const SettingsContent = () => {
  const [currentView, setCurrentView] = useState('main');
  const [selectedOption, setSelectedOption] = useState(null);

  // Opcoes principais
  const mainOptions = [
    { id: 'general', title: 'Geral', icon: 'settings' },
    { id: 'notifications', title: 'Notificações', icon: 'notifications' },
    { id: 'tasks', title: 'Tarefas', icon: 'list' },
    { id: 'rewards', title: 'Recompensas', icon: 'gift' },
    { id: 'language', title: 'Idioma', icon: 'language' },
  ];

  // Subopcoes para cada categoria //TODO: Pensar nas subopções adequadas.
  const subOptions = {
    general: [
      { id: 'account', title: 'Conta' },
      { id: 'privacy', title: 'Privacidade' },
      { id: 'theme', title: 'Tema' },
    ],
    notifications: [
      { id: 'sound', title: 'Som' },
      { id: 'vibration', title: 'Vibração' },
      { id: 'reminders', title: 'Lembretes' },
    ],
    tasks: [
      { id: 'defaultPoints', title: 'Pontos padrão' },
      { id: 'categories', title: 'Categorias' },
      { id: 'reminders', title: 'Lembretes' },
    ],
    rewards: [
      { id: 'pointValues', title: 'Valor em pontos' },
      { id: 'categories', title: 'Categorias' },
      { id: 'approval', title: 'Aprovação necessária' },
    ],
    language: [
      { id: 'portuguese', title: 'Português' },
      { id: 'english', title: 'English' },
      { id: 'spanish', title: 'Español' },
    ],
  };

  const renderMainOptions = () => (
    <ScrollView contentContainerStyle={styles.container}>
      {mainOptions.map((option) => <MainSettingsButton option={option} setCurrentView={setCurrentView} setSelectedOption={setSelectedOption}/>)}
    </ScrollView>
  );

  const renderSubOptions = () => (
    <ScrollView contentContainerStyle={styles.container}>
      {subOptions[selectedOption].map((option) => <SubSettingsButton option={option}/>)}
      
      <TouchableOpacity
        style={[styles.option, styles.backButton]}
        onPress={() => setCurrentView('main')}
      >
        <Ionicons name="arrow-back" size={24} color="#6C63FF" />
        <Text style={[styles.optionText, styles.backButtonText]}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
  return <View style={styles.content}>
    <Text style={styles.pageTitle}>Configurações</Text>
    <Text style={[styles.pageTitle, styles.pageSubTitle]}>{currentView === 'main' ? '' : mainOptions.find(o => o.id === selectedOption).title}</Text>
    {currentView === 'main' ? renderMainOptions() : renderSubOptions()}
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
  pageSubTitle: {
    fontSize: 24,
  },
  container: {
    padding: 15,
  },
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
  backButton: {
    marginTop: 20,
    borderBottomWidth: 0,
  },
  backButtonText: {
    color: '#6C63FF',
  },
});

export default SettingsContent;