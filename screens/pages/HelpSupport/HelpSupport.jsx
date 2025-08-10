import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Linking, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const HelpSupport = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqs = [
    {
      question: 'How do I book a service?',
      answer: 'Go to the home screen, select your desired category, choose a provider, and click "Book".'
    },
    {
      question: 'How do I contact a service provider?',
      answer: 'On the provider’s profile, you’ll find a "Message" or "Call" button to get in touch directly.'
    },
    {
      question: 'How can I reset my password?',
      answer: 'Go to Settings > Account > Reset Password, and follow the instructions.'
    },
  ];

  const toggleExpand = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Help & Support</Text>

      {/* Search Bar */}
      <View style={styles.search}>
        <Ionicons name="search-outline" size={20} color="#3F370F" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Search for help..."
          placeholderTextColor="#888"
          style={styles.input}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* FAQ Section */}
      <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
      {filteredFaqs.map((faq, index) => (
        <View key={index} style={styles.faqItem}>
          <TouchableOpacity style={styles.faqQuestion} onPress={() => toggleExpand(index)}>
            <Text style={styles.faqQuestionText}>{faq.question}</Text>
            <Ionicons
              name={expandedIndex === index ? 'chevron-up' : 'chevron-down'}
              size={20}
              color="#3F370F"
            />
          </TouchableOpacity>
          {expandedIndex === index && (
            <Text style={styles.faqAnswer}>{faq.answer}</Text>
          )}
        </View>
      ))}

      {/* Contact Support */}
      <Text style={styles.sectionTitle}>Contact Support</Text>
      <View style={styles.contactButtons}>
        <TouchableOpacity
          style={[styles.contactButton, { backgroundColor: '#3F370F' }]}
          onPress={() => Linking.openURL('mailto:support@locallink.com')}
        >
          <Ionicons name="mail-outline" size={20} color="#fff" />
          <Text style={styles.contactText}>Email Us</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.contactButton, { backgroundColor: '#25D366' }]}
          onPress={() => Linking.openURL('https://wa.me/1234567890')}
        >
          <Ionicons name="logo-whatsapp" size={20} color="#fff" />
          <Text style={styles.contactText}>WhatsApp</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.contactButton, { backgroundColor: '#1DA1F2' }]}
          onPress={() => Linking.openURL('tel:+1234567890')}
        >
          <Ionicons name="call-outline" size={20} color="#fff" />
          <Text style={styles.contactText}>Call Us</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HelpSupport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    color: '#3F370F',
    marginTop: 30,
    marginBottom: 20
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#3F370F',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 45,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    color: '#3F370F',
    marginVertical: 15,
  },
  faqItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestionText: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    color: '#3F370F',
  },
  faqAnswer: {
    marginTop: 10,
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#555',
  },
  contactButtons: {
    marginTop: 15,
    marginBottom: 40,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 22,
    borderRadius: 8,
    marginBottom: 10,
  },
  contactText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    marginLeft: 10,
  },
});
