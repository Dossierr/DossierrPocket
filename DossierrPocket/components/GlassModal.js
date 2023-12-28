// GlassModal.js
import React, { useState, useEffect } from 'react';
import { Modal, View, Image, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import fetchCases from '../api/GetCasesApiCall'

const GlassModal = ({ isVisible, onClose, onSelectCase, cases, onLogout, authToken }) => {

  const handleCaseSelection = (caseItem) => {
    onSelectCase(caseItem);
    onClose(); // Close the modal when a case is selected
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Image
              style={styles.logo}
              source={require('../assets/logo.png')}
            />
            <Text style={styles.headerText}>Dossierr</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text>✕</Text>
            </TouchableOpacity>
          </View>
            <ScrollView>
              

              {/* Divider */}
              <View style={styles.divider}></View>

              {/* Section 3: User */}
              <View style={styles.modalSection}>
                <Text style={styles.sectionHeader}>User</Text>
                <TouchableOpacity style={styles.modalItem} onPress={() => console.log('Profile pressed')}>
                  <Text style={styles.itemText}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalItem} onPress={onLogout}>
                  <Text style={styles.itemText}>Log out</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          {/* Copyright disclaimer and version number */}
          <View style={styles.footer}>
            <Text style={styles.disclaimer}>Copyright © 2023 Dossierr. All rights reserved - CC-BY-NC-4.0.</Text>
            <Text style={styles.version}>Version 1.0</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  closeButton: {
    padding: 10,
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: 5,
  },
  headerText: {
    fontSize: 20,
    color: 'black',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  modalItem: {
    marginBottom: 20,
  },
  itemText: {
    color: 'black',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.2)',
    marginBottom: 20,
  },
  modalSection: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'gray',
  },
  footer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.2)',
    paddingTop: 10,
    alignItems: 'center',
  },
  disclaimer: {
    color: 'gray',
    fontSize: 10,
  },
  version: {
    color: 'gray',
    fontSize: 8,
    marginTop: 5,
  },
});

export default GlassModal;
