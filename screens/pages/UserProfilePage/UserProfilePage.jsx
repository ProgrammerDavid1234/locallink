import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Switch,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserProfilePage = () => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const toggleNotifications = () => setNotificationsEnabled((prev) => !prev);
    const toggleTheme = () => setIsDarkTheme((prev) => !prev);
    const switchToLight = () => setIsDarkTheme(false);
    const switchToDark = () => setIsDarkTheme(true);
    const SettingItem = ({ title, onPress }) => (
        <TouchableOpacity style={styles.row} onPress={onPress}>
            <Text style={styles.rowText}>{title}</Text>
        </TouchableOpacity>
    );

    // Fetch user profile
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = await AsyncStorage.getItem('token'); // assuming you saved token here
                if (!token) {
                    Alert.alert('Error', 'No token found, please log in again.');
                    navigation.replace('Login');
                    return;
                }

                const response = await fetch('https://locallink-backend-74mz.onrender.com/api/v1/profile/me', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();

                if (!response.ok) throw new Error(data.message || 'Failed to load profile');

                setDisplayName(data.username || '');
                setEmail(data.email || '');
            } catch (error) {
                Alert.alert('Error', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('token');
            navigation.replace("GetStarted");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: isDarkTheme ? '#121212' : '#fff' }]}>
            {/* Header */}
            <View style={styles.profileContainer}>
                <View style={styles.onlyTwo}>
                    <Image
                        source={{ uri: 'https://i.pravatar.cc/100?img=1' }} // Replace with profile picture if available
                        style={styles.profileImage}
                    />
                    <View style={styles.name}>
                        <Text style={styles.profileName}>{displayName}</Text>
                        <Text style={styles.profileEmail}>{email}</Text>
                    </View>
                </View>
            </View>

            {/* Account Settings */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Account Settings</Text>
                <SettingItem onPress={() => navigation.navigate("EditProfile")}  title="Edit Profile" />
                <SettingItem onPress={() => navigation.navigate("PaymentMethodsHistory")} title="Payment Methods" />
                <SettingItem onPress={() => navigation.navigate("InviteFriends")} title="Invite Friends" />
            </View>

            {/* App Preferences */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>App Preferences</Text>
                <SettingItem title="Language" />
                <View style={styles.row}>
                    <Text style={styles.rowText}>Notifications</Text>
                    <Switch value={notificationsEnabled} onValueChange={toggleNotifications} />
                </View>
                <View style={styles.themeRow}>
                    <Text style={styles.rowText}>Appearance (Theme)</Text>
                    <View style={styles.themeButtons}>
                        <TouchableOpacity
                            onPress={() => setIsDarkTheme(false)}
                            style={[
                                styles.themeButton,
                                !isDarkTheme && styles.activeThemeButton,
                            ]}
                        >
                            <Text style={[styles.themeText, !isDarkTheme && styles.activeThemeText]}>
                                Light
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setIsDarkTheme(true)}
                            style={[
                                styles.themeButton,
                                isDarkTheme && styles.activeThemeButton,
                            ]}
                        >
                            <Text style={[styles.themeText, isDarkTheme && styles.activeThemeText]}>
                                Dark
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Support */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Support</Text>
                <SettingItem onPress={() => navigation.navigate("HelpSupport")} title="Help & Support" />
                <SettingItem title="Rate LocalLink" />
            </View>

            <TouchableOpacity onPress={handleLogout}>
                <Text style={styles.logout}>Logout</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const SettingItem = ({ title }) => (
    <TouchableOpacity style={styles.row}>
        <Text style={styles.rowText}>{title}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 30
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 25,
        display: 'flex',
        flexDirection: 'row',

    },
    onlyTwo: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center',
        
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    profileName: {
        fontSize: 20,
        color: '#333',
        fontFamily: 'Poppins_700Bold'
    },
    profileEmail: {
        color: '#666',
        fontSize: 14,
        marginBottom: 10,
        fontFamily: 'Poppins_400Regular'
    },
    editButton: {
        paddingVertical: 8,
        borderRadius: 20,
    },
    editButtonText: {
        color: '#3F370F',
        fontWeight: '600',
        marginLeft: 50,
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
        fontFamily: 'Poppins_400Regular',
        fontSize: 15
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#444',
        marginBottom: 10,
        fontFamily: 'Poppins_700Bold'
    },
    row: {
        backgroundColor: '#f5f5f5',
        paddingVertical: 14,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    rowText: {
        fontSize: 16,
        color: '#333',
        fontFamily: 'Poppins_400Regular'
    },
    themeRow: {
        paddingVertical: 14,
        paddingHorizontal: 15,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
    },
    themeButtons: {
        flexDirection: 'row',
        marginTop: 10,
        gap: 10,
    },
    themeButton: {
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderWidth: 1,
        borderColor: '#3F370F',
        borderRadius: 6,
        width: 100,
    },
    activeThemeButton: {
        backgroundColor: '#3F370F',
        borderColor: '#1A4BA0',
    },
    themeText: {
        fontWeight: '600',
        color: '#555',
        textAlign: 'center',
        fontFamily: 'Poppins_700Bold'

    },
    activeThemeText: {
        color: '#fff',
    },
    logout: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#3F370F',
        textAlign: 'center',
        marginBottom: 20,
        borderRadius: 5,
        fontFamily: 'Poppins_700Bold'
    },
});

export default UserProfilePage;
