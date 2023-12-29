import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

const ChatInput = ({ updateChatHistory, authToken, dossierId }) => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (inputText.trim() !== '') {
      try {
        setIsLoading(true);
  
        console.log("Sending request with the following data:");
        console.log("AuthToken:", authToken);
        console.log("DossierId:", dossierId);
        console.log("InputText:", inputText.trim());
  
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("Authorization", `token ${authToken}`);
        myHeaders.append("Content-Type", "application/json");
  
        const raw = JSON.stringify({
          "dossier_id": dossierId,
          "query": inputText.trim()
        });
  
        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
  
        const response = await fetch("https://dossierr.com/chat/chat/question/", requestOptions);
        const result = await response.text();
  
        // Update chat history in the parent component
        updateChatHistory(result);
  
        setInputText('');
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Ask Harvey a question about your case..."
        placeholderTextColor="gray"
        value={inputText}
        onChangeText={(text) => setInputText(text)}
        onSubmitEditing={handleSend}
        accessibilityLabel="Chat Input"
      />

      <TouchableOpacity
        style={styles.sendButton}
        onPress={handleSend}
        accessibilityLabel="Send Button"
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.sendButtonText}>Send</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop:20, 
    backgroundColor: 'black',
    
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#1A56DB',
    padding: 10,
    borderRadius: 5,
    fontWeight: '900'
  },
  sendButtonText: {
    color: 'white',
  },
});

export default ChatInput;
