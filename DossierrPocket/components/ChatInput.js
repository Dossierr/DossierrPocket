import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

const ChatInput = ({ onSend, isLoading }) => {
  const [inputText, setInputText] = useState('');

  const handleSend = async () => {
    if (inputText.trim() !== '') {
      await onSend(inputText);
      setInputText('');
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
      />
      
      <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
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
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80, 
    
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
