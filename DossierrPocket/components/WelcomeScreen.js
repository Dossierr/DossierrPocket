// WelcomeScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { loginUser } from '../api/LoginApiCall';

const WelcomeScreen = ({ setIsLoggedIn, setAuthToken, onLogin }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state
  const [errorMessage, setErrorMessage] = useState(null);

  const handleGetStarted = () => {
    setShowLogin(true);
  };

  const handleLogin = async () => {
    if (showLogin) {
      try {
        setLoading(true); // Set loading to true during API call

        const data = await loginUser(username, password);

        // Pass the token back to the parent component
        onLogin(data.token, data.user_id);
        setIsLoggedIn(true);
        setAuthToken(data.token); // Set the auth token in the state

        // Clear any previous error message
        setErrorMessage(null);
      } catch (error) {
        console.error('Error during authentication:', error);

        // Set error message to display to the user
        setErrorMessage('Invalid credentials. Please check your username and password.');

        // Clear error message after a few seconds (adjust as needed)
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      } finally {
        setLoading(false); // Set loading to false after API call completes
      }
    }
  };

  return (
    <View style={styles.wrapper}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.container}>
          <Image source={require('../assets/logo.png')} style={styles.image} />
          <View style={styles.centered}>
            <Text style={styles.appName}>Dossierr</Text>
            <Text style={styles.description}>Your GPT powered legal assistant. Get started to start chatting with your case files.</Text>
          </View>

          {!showLogin ? (
            <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          ) : (
            <>
            <View>
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor="lightgray"
                onChangeText={(text) => setUsername(text)}
                autoCorrect={false}
                autoCapitalize="none"
              />
              <View style={{height:10}}></View>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="lightgray"
                secureTextEntry
                autoCorrect={false}
                onChangeText={(text) => setPassword(text)}
              />
            </View>
              <TouchableOpacity style={styles.getStartedButton} onPress={handleLogin} disabled={loading}>
                {loading ? (
                  <ActivityIndicator size="small" color="white" /> // Display spinner if loading
                ) : (
                  <Text style={styles.buttonText}>Log in</Text>
                )}
              </TouchableOpacity>

              {errorMessage && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorMessage}>{errorMessage}</Text>
                </View>
              )}
            </>
          )}

          <View style={styles.footer}>
            <Text style={styles.disclaimer}>Copyright © 2023 Dossierr. All rights reserved - CC-BY-NC-4.0.</Text>
            <Text style={styles.version}>Version 1.0</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    padding: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 20,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centered: {
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 5,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    color: 'lightgray',
    marginBottom: 20,
    marginHorizontal: 20,
  },
  getStartedButton: {
    backgroundColor: '#1A56DB',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorContainer: {
    backgroundColor: '#F05252',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  errorMessage: {
    color: 'white',
    fontSize: 14,
  },
  footer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.2)',
    paddingTop: 10,
    alignItems: 'center',
  },
  disclaimer: {
    color: 'lightgray',
    fontSize: 10,
  },
  version: {
    color: 'lightgray',
    fontSize: 8,
    marginTop: 5,
  },
  input: {
    height: 60,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 0,
    paddingLeft: 10,
    width: 290,
    borderRadius: 5,
    color: 'white'
  },
  errorContainer: {
    backgroundColor: '#F05252',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  errorMessage: {
    color: 'white',
    fontSize: 14,
  },
});

export default WelcomeScreen;
