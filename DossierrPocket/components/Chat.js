import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ChatInput from './ChatInput';

const Chat = ({ route }) => {
  const { caseId, authToken } = route.params;
  const [chatHistory, setChatHistory] = useState([]);
  const flatListRef = useRef(null);

  const scrollToBottom = () => {
    flatListRef.current.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        console.log('Case ID:', caseId);
        console.log('Auth Token:', authToken);
  
        const response = await fetch(`https://dossierr.com/chat/chat/history/${caseId}`, {
          method: 'GET',
          headers: {
            'accept': 'application/json',
            'Authorization': `token ${authToken}`,
          },
        });
  
        if (!response.ok) {
          console.error('Error making GET request:', response.status);
          throw new Error('Error making GET request');
        }
  
        const result = await response.json();
        setChatHistory(result.chat);
        console.log('Received chat history:', result.chat);
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };
  
    if (caseId && authToken) {
      fetchChatHistory();
    }
  }, [caseId, authToken]);
  

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const updateChatHistory = (newMessage) => {
    setChatHistory((prevChatHistory) => [...prevChatHistory, { content: newMessage, type: 'user' }]);
  };

  const renderChatItem = ({ item }) => {
    console.log('Item:', item);

    const isAiMessage = item.type === 'ai';

    return (
      <View style={[styles.chatContainer, isAiMessage ? styles.aiMessage : styles.userMessage]}>
        <Text style={item.type === 'ai' ? styles.sender : styles.receiver}>{item.type}:</Text>
        <Text style={styles.messageText}>{item.content}</Text>
      </View>
    );
  };

  return (
    <>
      <FlatList
        ref={flatListRef}
        onContentSizeChange={scrollToBottom}
        onLayout={scrollToBottom}
        style={styles.background}
        data={chatHistory}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderChatItem}
      />

      <ChatInput 
        updateChatHistory={updateChatHistory}
        authToken={authToken} 
        caseId={caseId}
      />
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#121826',
    flex: 1,
    width: '100%',
    padding: 20,
    paddingBottom: 30,
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
  spacingView: {
    height: 20,
    paddingTop:30,
  },
});

export default Chat;
