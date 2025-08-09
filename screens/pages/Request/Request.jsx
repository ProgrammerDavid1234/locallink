import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Image,
} from 'react-native';

const requestsData = {
    pending: [
        {
            id: '1',
            title: 'Deep Cleaning Service',
            company: 'Sparkle Homes Inc.',
            dateTime: '2024-07-20 at 10:00 AM',
            status: 'Pending',
            image: require('../../../assets/plumbling.png'),
        },
        {
            id: '2',
            title: 'Emergency Plumbing Repair',
            company: 'Rapid Plumbers',
            dateTime: '2024-07-18 at 02:30 PM',
            status: 'Pending',
            image: require('../../../assets/plumbling.png'),
        },
        {
            id: '3',
            title: 'Emergency Plumbing Repair',
            company: 'Rapid Plumbers',
            dateTime: '2024-07-18 at 02:30 PM',
            status: 'Pending',
            image: require('../../../assets/plumbling.png'),
        },
        {
            id: '4',
            title: 'Emergency Plumbing Repair',
            company: 'Rapid Plumbers',
            dateTime: '2024-07-18 at 02:30 PM',
            status: 'Pending',
            image: require('../../../assets/plumbling.png'),
        },
        {
            id: '5',
            title: 'Emergency Plumbing Repair',
            company: 'Rapid Plumbers',
            dateTime: '2024-07-18 at 02:30 PM',
            status: 'Pending',
            image: require('../../../assets/plumbling.png'),
        },
    ],
    past: [],
};

const Request = () => {
    const [activeTab, setActiveTab] = useState('pending');

    const renderRequestCard = ({ item }) => (
        <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.infoContainer}>
                <View style={styles.statusTag}>
                    <Text style={styles.statusText}>{item.status}</Text>
                </View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.company}>{item.company}</Text>
                <View style={styles.dateRow}>
                    <Image
                        source={require('../../../assets/search.png')}
                        style={styles.calendarIcon}
                    />
                    <Text style={styles.date}>{item.dateTime}</Text>
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.chatButton}>
                        <Text style={styles.chatText}>Chat</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>My Request</Text>
            </View>

            {/* Tabs */}
            <View style={styles.tabs}>
                <TouchableOpacity
                    onPress={() => setActiveTab('pending')}
                    style={[styles.tabButton, activeTab === 'pending' && styles.activeTab]}
                >
                    <Text style={[styles.tabText, activeTab === 'pending' && styles.activeText]}>
                        Pending
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setActiveTab('past')}
                    style={[styles.tabButton, activeTab === 'past' && styles.activeTab]}
                >
                    <Text style={[styles.tabText, activeTab === 'past' && styles.activeText]}>
                        Past
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Request List */}
            <FlatList
                data={requestsData[activeTab]}
                keyExtractor={(item) => item.id}
                renderItem={renderRequestCard}
                contentContainerStyle={{ paddingVertical: 10 }}
                ListEmptyComponent={<Text style={styles.noRequests}>No requests found.</Text>}
            />
        </View>
    );
};

export default Request;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    header: {
        flexDirection: 'row',
        marginBottom: 20,
        width: '100%',
        paddingBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#000',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 24,
        color: '#3F370F',
        fontFamily: 'Poppins_700Bold',
    },
    tabs: {
        flexDirection: 'row',
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
    },
    tabButton: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
    },
    activeTab: {
        backgroundColor: '#3F370F',
    },
    tabText: {
        color: '#555',
        fontSize: 16,
        fontWeight: '600',
    },
    activeText: {
        color: '#fff',
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    infoContainer: {
        flex: 1,
        paddingLeft: 10,
        justifyContent: 'space-between',
    },
    statusTag: {
        backgroundColor: '#D2F2DD',
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 5,
    },
    statusText: {
        fontSize: 12,
        color: '#3F370F',
        fontWeight: '600',
        fontFamily: 'Poppins_400Regular'
    },
    title: {
        fontSize: 16,
        color: '#333',
        fontFamily: 'Poppins_700Bold'

    },
    company: {
        fontSize: 14,
        color: '#777',
        fontFamily: 'Poppins_400Regular'

    },
    dateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 3,
        fontFamily: 'Poppins_400Regular'

    },
    calendarIcon: {
        width: 16,
        height: 16,
        marginRight: 6,
    },
    date: {
        fontSize: 14,
        color: '#444',
        fontFamily: 'Poppins_400Regular'

    },
    buttonsContainer: {
        flexDirection: 'row',
        marginTop: 8,
        alignItems: 'center',
        gap: 20,
    },
    chatButton: {
        backgroundColor: '#3F370F',
        paddingVertical: 10,
        paddingHorizontal: 50,
        borderRadius: 6,
    },
    chatText: {
        color: '#fff',
        fontWeight: '600',
    },
    cancelText: {
        color: '#d00',
        fontWeight: '600',
        paddingVertical: 10,
        paddingHorizontal: 50,
        borderWidth: 1,
        borderRadius: 8
    },
    noRequests: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#999',
    },
});
