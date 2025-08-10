import React, { useLayoutEffect, useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Image, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Confirm = () => {
    return (
        <View>
            <View style={styles.container}>
                <Image style={styles.image} source={require('../../../assets/confirm.png')}></Image>
                <Text style={styles.Text}>Your appointment has been confirmed!</Text>
            </View>
        </View>
    )
}

export default Confirm
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 300
    },
     Text:{
        fontFamily: 'Poppins_700Bold',
        fontSize: 20,
        color: '#3F370F'
     }
});