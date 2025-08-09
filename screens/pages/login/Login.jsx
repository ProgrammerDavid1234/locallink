import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Missing Fields', 'Please enter both email and password.');
            return;
        }

        setLoading(true);
        try {
            // Call your backend API
            const response = await fetch('https://locallink-backend-74mz.onrender.com/api/v1/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Save JWT token (or whatever your backend returns)
                await AsyncStorage.setItem('token', data.token);

                console.log('User logged in:', data);
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Main' }],
                });
            } else {
                throw new Error(data.message || 'Login failed');
            }
        } catch (error) {
            console.log('Login error:', error.message);
            Alert.alert('Login Failed', error.message);
        } finally {
            setLoading(false);
        }
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/logoblack.png')} style={styles.logo} />
            <Text style={styles.title}>Welcome Back to LocalLink</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity style={styles.signupBtn} onPress={handleLogin} disabled={loading}>
                {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={styles.signupText}>Login</Text>
                )}
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
                <View style={styles.line} />
                <Text style={styles.orText}>OR</Text>
                <View style={styles.line} />
            </View>

            <TouchableOpacity style={styles.socialBtn}>
                <View style={styles.altOption}>
                    <Text style={styles.socialText}>Continue with Google</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialBtn}>
                <View style={styles.altOption}>
                    <Text style={styles.socialText}>Continue with Apple</Text>
                </View>
            </TouchableOpacity>

            <View style={styles.loginContainer}>
                <Text style={styles.altOption}>
                    Don't have an account?{' '}
                    <Text onPress={() => navigation.navigate('Signup')} style={{ color: '#3F370F' }}>
                        Signup
                    </Text>
                </Text>
            </View>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff',
    },
    logo: {
        width: 100,
        height: 100,
        marginTop: 130,
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
        marginTop: 50,
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
    altOption: {
        alignSelf: 'flex-start',
        fontFamily: 'Poppins_700Bold',
        flexDirection: 'row',
        alignItems: 'center',
    },
    loginContainer: {
        marginTop: 100,
        alignItems: 'center',
    },
});
