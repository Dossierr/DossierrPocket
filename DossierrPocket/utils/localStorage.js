import AsyncStorage from '@react-native-async-storage/async-storage';

// Initialize AsyncStorage with a key-value pair
const initializeAsyncStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log(`AsyncStorage initialized with ${key}: ${value}`);
  } catch (error) {
    console.error('Error initializing AsyncStorage:', error);
  }
};

const storeAuthToken = async (token) => {
    try {
      await AsyncStorage.setItem('authToken', token);
    } catch (error) {
      console.error('Error storing auth token:', error);
    }
  };

// Clear AsyncStorage
const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log('AsyncStorage cleared.');
  } catch (error) {
    console.error('Error clearing AsyncStorage:', error);
  }
};

 const checkAuthToken = async () => {
    const storedToken = await AsyncStorage.getItem('authToken');
  
    if (storedToken) {
      console.log('Auth Token stored on device:', storedToken);
      return storedToken;
    } else {
      console.log('No Auth token - log in first');
      return null;
    }
  };

export { initializeAsyncStorage, clearAsyncStorage, storeAuthToken, checkAuthToken};
