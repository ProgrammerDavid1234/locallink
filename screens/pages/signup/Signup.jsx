import React, { useLayoutEffect, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location'; // For getting device GPS

const Signup = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  // Hide header
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  // Request location permissions and get location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required to sign up.');
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLatitude(loc.coords.latitude);
      setLongitude(loc.coords.longitude);
    })();
  }, []);

  const handleSignup = async () => {
    if (!email || !password || !username || !latitude || !longitude) {
      Alert.alert('Missing Fields', 'Please fill in all fields and enable location.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://locallink-backend-74mz.onrender.com/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          username,
          latitude,
          longitude
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Signup failed');

      Alert.alert('Success', 'Account created successfully!');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Signup Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../../../assets/logoblack.png')} style={styles.logo} />

      {/* Title */}
      <Text style={styles.title}>Sign Up</Text>

      {/* Inputs */}
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        keyboardType="email-address"
        placeholderTextColor="#999"
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#999"
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signupBtn} onPress={handleSignup} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.signupText}>Sign Up</Text>}
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>

      {/* Social Signups */}
      <TouchableOpacity style={styles.socialBtn}>
        <Text style={styles.socialText}>Continue with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.socialBtn}>
        <Text style={styles.socialText}>Continue with Facebook</Text>
      </TouchableOpacity>

      {/* Already Have an Account */}
      <View style={styles.loginContainer}>
        <Text style={{ color: '#555' }}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{ color: '#3F370F', fontWeight: 'bold' }}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 30,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    marginTop: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginTop: 20,
    fontSize: 16,
  },
  signupBtn: {
    backgroundColor: '#3F370F',
    paddingVertical: 15,
    paddingHorizontal: 40,
    fontFamily: 'Poppins_700Bold',
    borderColor: '#3F370F',
    borderWidth: 1,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  signupText: {
    fontSize: 15,
    fontFamily: 'Poppins_700Bold',
    color: '#fff',
    textAlign: 'center',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    paddingTop: 10,
    marginTop: 30,
    width: '100%',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: '#999',
  },
  socialBtn: {
    backgroundColor: '#f1f1f1',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  socialText: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    color: '#333',
  },
  loginContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
});
