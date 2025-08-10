import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import * as Linking from 'expo-linking';

export default function InviteFriends() {
    const referralCode = "LocalLinkInvite123";
    const shareMessage = `Join me on LocalLink! Use my referral code: ${referralCode}`;

    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(referralCode);
        Alert.alert("Copied!", "Referral code copied to clipboard.");
    };

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Invite Friends</Text>
                <View style={styles.headerIcons}>
                    <Ionicons name="notifications-outline" size={24} color="#000" style={{ marginRight: 12 }} />
                    <Image
                        source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }}
                        style={styles.avatar}
                    />
                </View>
            </View>

            {/* Illustration */}
            <Image
                source={require("../../../assets/invite.png")}
                style={styles.illustration}
            />

            {/* Text */}
            <Text style={styles.title}>Share the LocalLink Love!</Text>
            <Text style={styles.subtitle}>
                Invite your friends to LocalLink and earn amazing rewards when they sign up and complete their first service.
            </Text>

            {/* Referral Code */}
            <View style={styles.referralBox}>
                <Text style={styles.referralCode}>{referralCode}</Text>
                <TouchableOpacity onPress={copyToClipboard}>
                    <Feather name="copy" size={20} color="#3F370F" />
                </TouchableOpacity>
            </View>

            {/* Share Options */}
            <View style={styles.shareContainer}>
                <Text style={styles.shareTitle}>Share via</Text>
                <View style={styles.shareRow}>
                    <ShareButton icon="logo-whatsapp" color="#25D366" message={shareMessage} />
                    <ShareButton icon="logo-twitter" color="#1DA1F2" message={shareMessage} />
                    <ShareButton icon="logo-facebook" color="#3b5998" message={shareMessage} />
                    <ShareButton icon="mail-outline" color="#D44638" message={shareMessage} />
                    <ShareButton icon="chatbubble-ellipses-outline" color="#8E8E93" message={shareMessage} />
                </View>
            </View>

            {/* How It Works */}
            <View style={styles.howItWorks}>
                <Text style={styles.howTitle}>How it Works & Rewards</Text>
                <TouchableOpacity><Text style={styles.link}>Invite a Friend, Get Rewards</Text></TouchableOpacity>
                <TouchableOpacity><Text style={styles.link}>Earn Referral Credits</Text></TouchableOpacity>
            </View>
        </ScrollView>
    );
}

// ✅ Updated ShareButton to open apps
function ShareButton({ icon, color, message }) {
    const openShare = () => {
        const encodedMessage = encodeURIComponent(message);
        let url = "";

        switch (icon) {
            case "logo-whatsapp":
                url = `whatsapp://send?text=${encodedMessage}`;
                break;
            case "logo-twitter":
                url = `https://twitter.com/intent/tweet?text=${encodedMessage}`;
                break;
            case "logo-facebook":
                url = `https://www.facebook.com/sharer/sharer.php?u=${encodedMessage}`;
                break;
            case "mail-outline":
                url = `mailto:?subject=Join%20LocalLink&body=${encodedMessage}`;
                break;
            case "chatbubble-ellipses-outline":
                url = `sms:&body=${encodedMessage}`;
                break;
            default:
                Alert.alert("Error", "Unsupported share option");
                return;
        }

        Linking.openURL(url).catch(() => {
            Alert.alert("App not available", "It looks like this app is not installed.");
        });
    };

    return (
        <TouchableOpacity style={styles.shareButton} onPress={openShare}>
            <Ionicons name={icon} size={28} color={color} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 20, paddingTop: 40 },
    header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingTop: 30 },
    headerTitle: { fontSize: 20, fontWeight: "bold" },
    headerIcons: { flexDirection: "row", alignItems: "center" },
    avatar: { width: 32, height: 32, borderRadius: 16 },
    illustration: { width: "100%", height: 260, resizeMode: "contain", marginVertical: 60 },
    title: { fontSize: 28, textAlign: "center", fontFamily: 'Poppins_700Bold' },
    subtitle: { textAlign: "center", color: "#555", fontSize: 14, marginTop: 8, marginBottom: 20, fontFamily: 'Poppins_400Regular' },
    referralBox: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 12, marginBottom: 20 },
    referralCode: { fontSize: 16, fontWeight: "bold", color: "#3F370F" },
    shareContainer: { marginBottom: 20 },
    shareTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 12 },
    shareRow: { flexDirection: "row", justifyContent: "space-around" },
    shareButton: { padding: 10 },
    howItWorks: { marginTop: 20 },
    howTitle: { fontSize: 26, marginBottom: 10, fontFamily: 'Poppins_700Bold' },
    link: { color: "#3F370F", marginBottom: 8, fontFamily: 'Poppins_400Regular', fontSize: 18 }
});
