import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const GetStarted = ({ navigation }) => {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.middleContent}>
                <Image
                    source={require('../../assets/logoblack.png')}
                    style={styles.logo}
                />
                <Text style={styles.title}>Find Help Nearby, Instantly</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
        </View>
    );
};

export default GetStarted;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        justifyContent: 'space-between',
        paddingVertical: 40,
        alignItems: 'center',
        fontFamily: 'Arial',
    },
    middleContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 100,
        marginBottom: 20,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 24,
        fontFamily: 'Poppins_700Bold',
        color: '#3F370F',
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#3F370F',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 8,
        width: 350,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'Poppins_700Bold',
        textAlign: 'center',
    },
});
