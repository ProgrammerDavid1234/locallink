import React, { useLayoutEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Keyboard } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const BookServices = () => {
    const [selectedValue, setSelectedValue] = useState("new1");
    const navigation = useNavigation();
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../../../assets/arrow.png')}
                        style={styles.imageArrow}
                    />
                </TouchableOpacity>
                <Text style={styles.profileProviderName}>Book Services</Text>
            </View>

            <View style={styles.servicesDetails}>
                <Text style={styles.servicesText}>Services Details</Text>
                <View style={styles.dropDownDiv}>
                    <Text style={styles.textBeforeDropdown}>Select Services</Text>
                    <View style={styles.dropDown}>
                        <Picker
                            selectedValue={selectedValue}
                            onValueChange={(itemValue) => setSelectedValue(itemValue)}
                            style={{ height: 50, width: 240 }}
                        >
                            <Picker.Item label="New" value="new1" />
                            <Picker.Item label="New" value="new2" />
                            <Picker.Item label="New" value="new3" />
                        </Picker>
                    </View>

                    <Text style={styles.textBeforeDropdown}>Date and Time</Text>
                    <View style={styles.dropDown}>
                        {Platform.OS === 'ios' ? (
                            <DateTimePicker
                                value={date}
                                mode="date"
                                display="spinner"
                                onChange={onChange}
                                style={{ width: '100%', padding: 30 }}
                            />
                        ) : (
                            <TouchableOpacity onPress={() => setShow(true)}>
                                <Text style={styles.showMe}>{date.toDateString()}</Text>
                            </TouchableOpacity>
                        )}
                        {Platform.OS === 'android' && show && (
                            <DateTimePicker
                                value={date}
                                mode="date"
                                display="default"
                                onChange={(event, selectedDate) => {
                                    setShow(false);
                                    if (selectedDate) setDate(selectedDate);
                                }}
                            />
                        )}
                    </View>

                    <View style={styles.time}>
                        <View style={styles.time1}>
                            <Text style={styles.timeSelcted}>09:00 AM</Text>
                            <Text style={styles.timeSelcted}>09:00 AM</Text>
                            <Text style={styles.timeSelcted}>09:00 AM</Text>
                        </View>
                        <View style={styles.time2}>
                            <Text style={styles.timeSelcted}>09:00 AM</Text>
                            <Text style={styles.timeSelcted}>09:00 AM</Text>
                            <Text style={styles.timeSelcted}>09:00 AM</Text>
                        </View>
                    </View>

                    <View style={styles.noteForProvider}>
                        <TextInput
                            style={styles.input}
                            placeholder="Add any specific requests or notes for the provider..."
                            keyboardType="default"
                            placeholderTextColor="#999"
                            multiline
                            numberOfLines={4}
                        />

                    </View>
                    <View style={styles.btnBtn}>
                        <Text style={styles.confirmBookingText}>Confirm Booking</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default BookServices;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 20,
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
    },
    servicesDetails: {
        marginTop: 20,
    },
    servicesText: {
        fontSize: 24,
        fontFamily: 'Poppins_700Bold',
        color: '#3F370F',
        marginBottom: 10,
    },
    dropDownDiv: {
        borderWidth: 0.5,
        padding: 20,
        borderColor: '#3F370F',
        borderRadius: 8,
        marginTop: 10,
    },
    textBeforeDropdown: {
        fontSize: 18,
        fontFamily: 'Poppins_700Bold',
        marginBottom: 5,
    },
    dropDown: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: 'transparent',
        width: '70%',
        marginRight: 120,
        alignSelf: 'center',
        marginBottom: 15,
        padding: 100
    },
    showMe: {
        padding: 15
    },
    time1: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        marginTop: 10,
        fontFamily: 'Poppins_400Regular'

    },
    time2: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        marginTop: 10,
        fontFamily: 'Poppins_400Regular'
    },
    timeSelcted: {
        borderWidth: 1,
        padding: 20,
        borderRadius: 8,
        fontFamily: 'Poppins_700Bold'
    },
    time: {
        marginTop: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        height: 120,
        padding: 15,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        textAlignVertical: 'top', // makes multiline text start at the top-left
        fontSize: 16,
        color: '#333',
        marginTop: 20,
        width: 300,
        marginLeft: 35
    },
    btnBtn:{
        marginTop: 30,
        padding: 10,
        backgroundColor: '#3F370F',
        borderRadius: 8
    },
    confirmBookingText:{
        textAlign: 'center',
        padding: 10,
        fontFamily: 'Poppins_700Bold',
        color: '#fff',

    }
});
