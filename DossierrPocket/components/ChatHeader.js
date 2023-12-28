// ChatHeader.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import GlassModal from './GlassModal';
import Icon from 'react-native-vector-icons/FontAwesome';

const ChatHeader = ({ title, cases, onSelectCase, onLogout }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <View style={styles.headerRow}>
      {/* Logo */}
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      <Text style={styles.title}>{title}</Text>
      <View style={styles.sidebarButton}>
        <TouchableOpacity onPress={openModal}>
          <Icon name="bars" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <GlassModal isVisible={isModalOpen} onClose={closeModal}  onLogout={onLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    backgroundColor: 'rgba(21, 29, 36, 0.9)',
    zIndex: 2,
  },
  logo: {
    width: 40, // Adjust the width as needed
    height: 40, // Adjust the height as needed
    resizeMode: 'contain',
    borderRadius: 10,
  },
  sidebarButton: {
    zIndex: 2,
    padding: 5,
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    zIndex: 2,
  },
});

export default ChatHeader;
