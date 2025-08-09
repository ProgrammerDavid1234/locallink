import React, { useLayoutEffect, useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  Image
} from 'react-native';
import ChatMessage from '../../components/ChatMessage';
import { useNavigation } from '@react-navigation/native';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = () => {
    if (inputMessage.trim() === '') return;
    setMessages(prev => [...prev, { text: inputMessage, isSender: true }]);
    setInputMessage('');
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0} // or 0 for both
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../../assets/arrow.png')}
              style={styles.imageArrow}
            />
          </TouchableOpacity>
          <Text style={styles.profileProviderName}>Sarah's Cleaning Services</Text>
        </View>

        <View style={{ flex: 1 }}>
          <FlatList
            data={messages}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <ChatMessage message={item.text} isSender={item.isSender} />
            )}
            contentContainerStyle={styles.chatContainer}
          />
        </View>


        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputMessage}
            onChangeText={setInputMessage}
            placeholder="Type a message..."
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    paddingHorizontal: 10,
    paddingTop: 10,

  },

  chatContainer: {
    padding: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  input: {
    flex: 1,
    height: 45,
    borderRadius: 5,
    paddingHorizontal: 15,
    backgroundColor: '#eee',
    fontSize: 16,
  },
  sendButton: {
    justifyContent: 'center',
    marginLeft: 0,
    backgroundColor: '#3F370F',
    borderRadius: 5,
    paddingHorizontal: 25,
    height: 45,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
    width: '100%',
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  imageArrow: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  profileProviderName: {
    fontSize: 24,
    color: '#3F370F',
    fontFamily: 'Poppins_700Bold',
    marginTop: 5,
    textAlign: 'center'
  },
});

export default ChatScreen;
