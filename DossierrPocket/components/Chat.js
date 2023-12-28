import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const Chat = ({ route }) => {
  const { caseId, authToken } = route.params;
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await fetch(`https://dossierr.com/chat/chat/history/${caseId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${authToken}`,
          },
        });
        const result = await response.json();
        setChatHistory(result.chat);
        console.log('Received chat history: ', result.chat)
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    if (caseId && authToken) {
      fetchChatHistory();
    }
  }, [caseId, authToken]);

  const renderChatItem = ({ item }) => {
    console.log('Item:', item); // Log the entire item to see its structure
  
    const isAiMessage = item.type === 'ai';
    console.log('Is AI Message:', isAiMessage); // Log if it's an AI message
  
    return (
      <View style={[styles.chatContainer, isAiMessage ? styles.aiMessage : styles.userMessage]}>
        <Text style={item.type === 'ai' ? styles.sender : styles.receiver}>{item.type}:</Text>
        <Text style={styles.messageText}>{item.content}</Text>
      </View>
    );
  };

  return (
    <FlatList
      style={styles.background}
      data={chatHistory}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderChatItem}
    />
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#2E3842',
    flex: 1,
    width: '100%',
    padding: 20,
    paddingBottom: 30,
    backgroundColor: '#273132'
  },
  chatContainer: {
    padding: 16,
    borderBottomWidth: 1,
    backgroundColor: '#2E3842',
  },
  chatContent: {
    fontSize: 16,
    color: 'white',
  },
  aiMessage: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 10,
    maxWidth: '80%',
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  userMessage: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 10,
    maxWidth: '80%',
    alignSelf: 'flex-end',
    marginBottom: 5,
  },
  sender: {
    fontWeight: 'bold',
    color: 'blue',
    marginRight: 5,
  },
  receiver: {
    fontWeight: 'bold',
    color: 'green',
    marginRight: 5,
  },
  messageText: {
    color: '#333',
  },
  
});

export default Chat;
