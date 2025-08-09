import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChatMessage = ({ message, isSender }) => {
  return (
    <View style={[styles.messageContainer, isSender ? styles.sender : styles.receiver]}>
      <Text style={styles.messageText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    maxWidth: '70%',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  sender: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C5',
  },
  receiver: {
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA',
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
});

export default ChatMessage;
