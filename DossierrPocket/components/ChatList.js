import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { fetchCases } from '../api/GetCasesApiCall';
import { useNavigation } from '@react-navigation/native';

const ChatList = ({ authToken }) => {
  const navigation = useNavigation();
  const [cases, setCases] = useState([]);

  useEffect(() => {
    const fetchCasesData = async () => {
      try {
        const casesData = await fetchCases(authToken);
        setCases(casesData);
      } catch (error) {
        console.error('Error fetching cases data:', error);
      }
    };

    if (authToken) {
      fetchCasesData();
    }
    
  }, [authToken]);

  const renderChatItem = ({ item }) => (
    <TouchableOpacity onPress={() => onCasePress(item.id)}>
      <ChatItem chat={item} />
    </TouchableOpacity>
  );

  const onCasePress = (caseId) => {
    // Handle the case press
    console.log(`Case pressed: ${caseId}`);
    // Navigate to the Chat component instead of ChatScrollView
    // Pass additional data: caseId and authToken
    console.log('Navigating to Chat component: ', caseId, authToken)
    navigation.navigate('Chat', { caseId, authToken });
  };

  return (
    <FlatList
      data={cases}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderChatItem}
    />
  );
};

const ChatItem = ({ chat }) => {
  const formattedDate = moment(chat.updated_at).fromNow();

  return (
    <View style={styles.chatContainer}>
      <Text style={styles.chatTitle}>{chat.title}</Text>
      <Text style={styles.lastUpdated}>Last Updated: {formattedDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chatContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2E3842',
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  lastUpdated: {
    fontSize: 12,
    color: '#7D8A9A',
    marginTop: 8,
  },
});

export default ChatList;
