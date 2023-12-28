import React, { useState, useEffect } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { checkAuthToken, clearAsyncStorage, storeAuthToken } from './utils/localStorage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ChatHeader from './components/ChatHeader';
import ChatList from './components/ChatList';
import ChatScrollView from './components/ChatScrollView';
import WelcomeScreen from './components/WelcomeScreen';
import Chat from './components/Chat';

const Stack = createStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const initializeAuthToken = async () => {
      const storedToken = await checkAuthToken();
      if (storedToken) {
        setAuthToken(storedToken);
        setIsLoggedIn(true);
      }
    };
    initializeAuthToken();
  }, [authToken]);

  const handleLogin = (token) => {
    setAuthToken(token);
    setIsLoggedIn(true);
    storeAuthToken(token);
  };

  const onLogout = async () => {
    try {
      await clearAsyncStorage();
      setIsLoggedIn(false);
      setAuthToken(null);
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ChatList"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#273132', // Set the desired background color for the header
        },
        headerTintColor: 'white', // Set the text color of the header
      }}>
        <Stack.Screen
          name="ChatList"
          options={{ headerShown: false }}
        >
          {() => (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
              <View style={[styles.background, { backgroundColor: 'rgb(18, 24, 38)' }]}>
                <SafeAreaView style={styles.safeArea}>
                  {isLoggedIn && authToken ? (
                    <>
                      <ChatHeader title={'Your cases'} onLogout={onLogout} authToken={authToken} />
                      <ChatList authToken={authToken} />
                    </>
                  ) : (
                    <WelcomeScreen
                      setIsLoggedIn={setIsLoggedIn}
                      setAuthToken={setAuthToken}
                      onLogin={handleLogin}
                    />
                  )}
                </SafeAreaView>
              </View>
            </KeyboardAvoidingView>
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Chat"
          component={Chat}
          initialParams={{ authToken: authToken }} // Pass authToken as initialParams
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeArea: {
    backgroundColor: '#152124',
    flex: 1,
    width: '100%',
    paddingTop: 30,
  },
});

export default App;
