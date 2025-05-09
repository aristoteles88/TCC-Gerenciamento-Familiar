import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'auth_token';

export const storeToken = async (token) => {
  try {
    await AsyncStorage.multiSet([
      [TOKEN_KEY, token],
      ['expiry', new Date(Date.now() + 60 * 60 * 1000).toString()]
    ]);
  } catch (error) {
    console.error('Error storing token:', error);
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    if (token === null) {
      return null;
    } else {
      const expiry = await AsyncStorage.getItem('expiry');
      if (new Date(expiry) < new Date()) {
        await removeToken();
        return null;
      }
      return token;
    }
    return ;
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error removing token:', error);
  }
};