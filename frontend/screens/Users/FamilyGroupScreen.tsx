import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, Button } from 'react-native';
import { Divider } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import api from '@/api/client';
import getUserData from '@/hooks/getUserData';



const FamilyGroupScreen = () => {
  const [familyName, setFamilyName] = useState('')
  const [userLoaded, setUserLoaded] = useState(false);
  // const [submitting, setSubmitting] = useState(false);
  // const [showIcon, setShowIcon] = useState(true);
  const navigation = useNavigation();
  const { user, loading, error } = getUserData();
  const [users, setUsers] = useState([]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    if (!userLoaded) {
      setUsers([user]);
      setUserLoaded(true);
    }
  }

  if (error) {
    console.log('Error: ', error);
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error: {error}</Text>
        <Button title="Retry" onPress={() => navigation.replace('Login')} />
      </View>
    );
  }

  const onSaveFamily = async () => {
    try {
      const familyId = user ? user.family_id : null;
      const familyMembers = users ? users?.map((user) => user?.uid) : [''];
      const newFamily = {uid: familyId, name: familyName, members: familyMembers};
      if (familyId === null) {
        console.log('Criando nova família...');
        console.log('Dados da nova família: ', newFamily);
        const resp = await api.post("/families", newFamily);
        if (resp.status === 201) {
          await api.put(`/users/${user?.uid}`, { family_id: resp.data._id });
          console.log('Usuário adicionado à família com sucesso!');
        }
      } else {
        const resp = await api.put(`/families/${familyId}`, newFamily);
        if (resp.status === 200) {
          console.log('Família atualizada com sucesso!');
          await api.put(`/users/${user?.uid}`, { family_id: resp.data.uid });
          console.log('Usuário atualizado com sucesso!');
        }
      }
      navigation.navigate('Home');
    } catch (err) {
      console.log('Erro ao criar/atualizar família: ', err);
      // alert('Erro ao criar/atualizar família: ', err);
    }
  };
  

  // Dados mockados
  const header = ["Nome", "E-mail", "Idade", "Administrador", "Perfil", ""];
  // const familyId = await api.post('families/', {});
  // console.log(familyId);
  // const users = [
  //   { id: '1', name: 'Beatriz Silva', email: 'beatriz@email.com', age: 35, admin: true, profile: "Mãe"},
  //   { id: '2', name: 'Pedro Silva', email: 'pedro@email.com', age: 37, admin: true, profile: "Pai"},
  //   { id: '3', name: 'Bruno Silva', email: 'bruno@email.com', age: 14, admin: false, profile: "Filho"},
  //   { id: '4', name: 'Amanda Silva', email: 'amanda@email.com', age: 9, admin: false, profile: "Filha"},
  // ];
  // console.log(users);

  const tableHeader = () => (
    <View style={styles.headerRow}>
      <Text style={[styles.headerText, styles.nameContainer]}>{header[0]}</Text>
      <Text style={[styles.headerText, styles.emailContainer]}>{header[1]}</Text>
      <Text style={[styles.headerText, styles.ageContainer]}>{header[2]}</Text>
      <Text style={[styles.headerText, styles.adminContainer]}>{header[3]}</Text>
      <Text style={[styles.headerText, styles.profileContainer]}>{header[4]}</Text>
      <Text style={[styles.headerText, styles.actionsContainer]}>{header[5]}</Text>
    </View>
  )

  const tableFooter = () => (
    <View style={{alignItems: 'flex-end'}}>
      <TouchableOpacity style={styles.buttonBorder}>
        <Text style={styles.buttonText}>Adicionar</Text>
        <Ionicons name='add' style={styles.icon}/>
      </TouchableOpacity>
    </View>
  ) 

  // console.log(users);


  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('@/assets/images/logo.png')} 
            style={styles.logo}
          />
        </View>
      </View>

      <View style={styles.familyNameView}>
        <Divider width={1} color="#A9A9A9" />
        <View style={styles.familyName}>
          <TextInput
            style={styles.input}
            placeholder="Nome da Família"
            placeholderTextColor="#999"
            value={familyName}
            onChangeText={setFamilyName}
            autoCapitalize='words'
          />
          <Ionicons name="pencil" size={24} color="black" style={styles.icon}/>
        </View>
        <Divider width={1} color="#A9A9A9" />
      </View>

      <View style={styles.table}>
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={tableHeader}
          ListFooterComponent={tableFooter}
          renderItem={({ item }) => (
            <View style={styles.userItem}>
              <View style={styles.nameContainer}>
                <Image 
                  source={item.avatar ? { uri: item.avatar } : getAvatar(item.id)}
                  style={styles.userAvatar}
                />
                <Text style={styles.listItemText}>{item.name}</Text>
              </View>
              <View style={styles.emailContainer}>
                <Text style={styles.listItemText}>{item.email}</Text>
              </View>
              <View style={styles.ageContainer}>
                <Text style={styles.listItemText}>{item.age}</Text>
              </View>
              <View style={styles.adminContainer}>
                {
                  item.is_admin ? <Ionicons name="checkmark" style={styles.icon}/> : ''
                }
              </View>
              <View style={styles.profileContainer}>
                <Text style={styles.listItemText}>{item.profile}</Text>
              </View>
              <View style={styles.actionsContainer}>
                <TouchableOpacity>
                  <Ionicons name="pencil" style={styles.icon}/>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons name="trash" style={[styles.icon, styles.trashIcon]}/>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View> 

      <Divider width={1} color="#A9A9A9" />

      <View style={styles.footerButtons}>
        <TouchableOpacity 
          style={styles.buttonBorder}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.buttonBorder}
          onPress={ async () => await onSaveFamily() }
        >
          <Text style={[styles.buttonText, styles.saveButtonText]}>Salvar</Text>
        </TouchableOpacity>
      </View>
      
    </ScrollView>
  );
};

const getAvatar = (id: string) => {
  const avatars = {
    '1': require('@/assets/images/avatar_mom.png'),
    '2': require('@/assets/images/avatar_dad.png'),
    '3': require('@/assets/images/avatar_boy.png'),
    '4': require('@/assets/images/avatar_girl.png'),
  };
  return avatars[id];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    padding: 20,
    height: 'auto',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    height: 'auto',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 400,
    height: 400,
  },
  familyNameView: {
    flexGrow: 0,
    justifyContent: "center",
  },
  familyName: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    width: 'auto',
    lineHeight: 20,
    paddingVertical: 10,
  },
  table: {
    justifyContent: 'space-around',
    height: '50%',
  },
  icon:{
    fontSize: 24,
    color: 'black',
    alignSelf: 'center',
  },
  trashIcon:{
    color: 'red',
  },
  input: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    minWidth: 300,
    width: 'auto',
    lineHeight: 20,
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginHorizontal: 10,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#D0D0D0',
    paddingVertical: 12,
    justifyContent: 'space-between',
  },
  headerText: {
    color: '#505050',
    fontWeight: 'bold',
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '33%',
  },
  userAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 5,
  },
  emailContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '33%',
  },
  ageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: 80,
  },
  adminContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: 140,
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: 80,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 120,
  },
  listItemText: {
    fontSize: 14,
    color: '#666',
  },
  buttonBorder: {
    flexDirection: 'row',
    margin: 15,
    borderWidth: 1,
    borderColor: "#A0A0A0",  
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignContent: 'center',
    flexShrink: 1,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    height: 44,
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'center',
    color: "#414651",
    alignSelf: 'center',
  },
  footerButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButtonText: {
    textAlign: 'center',
    color: "#296A09"
  },
  cancelButtonText: {
    textAlign: 'center',
    color: "#DE2A1A"
  }
});

export default FamilyGroupScreen;