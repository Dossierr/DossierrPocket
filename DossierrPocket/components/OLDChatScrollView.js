import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Animated } from 'react-native';

const ChatScrollView = ({ caseId, authToken }) => {
  const scrollViewRef = useRef();
  const fadeInAnim = useRef(new Animated.Value(0)).current;
  const [messages, setMessages] = useState([{
    "chat": [
      {
        "content": "Pizza is uitgevonden in Italië.",
        "additional_kwargs": {},
        "type": "ai",
        "example": false
      },
      {
        "content": "Waar is pizza uitgevonden?",
        "additional_kwargs": {},
        "type": "human",
        "example": false
      }
    ]
  }]); // Initialize with an empty array
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async (caseId, authToken) => {
      try {
        const response = await fetch(
          `https://dossierr.com/chat/chat/history/811e41d4-fc34-46f4-8400-8466a526c6d4/`,
          {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Authorization': 'token 10f6bd89a70a527613ee269e0b0f9b54ca87686b',
            },
          }
        );
  
        if (!response.ok) {
          throw new Error(`Failed to fetch chat history. Status: ${response.status}`);
        }
  
        const chatHistory = await response.json();
        setMessages(chatHistory);
        fadeIn();
        console.log(chatHistory)
        scrollToBottom();
      } catch (error) {
        console.error('Error fetching chat history:', error.message);
      } finally {
        setIsLoading(false); // Set loading state to false whether successful or not
      }
    };
  
    fetchData();
  }, [caseId, authToken]);

  const fadeIn = () => {
    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 2000, // Adjust the duration as needed
      useNativeDriver: false,
    }).start();
  };

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  if (isLoading) {
    // Render a loading indicator while data is being fetched
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.glassContent}
      contentContainerStyle={styles.chatHistory}
      showsVerticalScrollIndicator={true}
    >
      {messages[0].chat.map((message, index) => (
        <Animated.View
          key={index}
          style={[
            message.type === 'ai' ? styles.HarveyChatBubble : styles.userChatBubble,
            { opacity: fadeInAnim },
          ]}
        >
          <Text style={message.type === 'ai' ? styles.sender : styles.receiver}>{message.type}:</Text>
          <Text style={styles.messageText}>{message.content}</Text>
        </Animated.View>
      ))}
      <View style={styles.spacingView}>
        <Text></Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  glassContent: {
    flex: 1,
    width: '100%',
    padding: 20,
    paddingBottom: 30,
    backgroundColor: '#273132'
  },
  chatHistory: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  HarveyChatBubble: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 10,
    maxWidth: '80%',
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  userChatBubble: {
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
  },
});

export default ChatScrollView;
