import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";

export default function MapScreen() {
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);

    // Mock data for services
    const services = [
        { id: 1, title: "Handyman - John", lat: 37.78825, lon: -122.4324, type: "Handyman" },
        { id: 2, title: "Cleaning - Sarah", lat: 37.78925, lon: -122.4314, type: "Cleaning" },
        { id: 3, title: "Plumber - Mike", lat: 37.79025, lon: -122.4304, type: "Plumbing" },
    ];

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                alert("Permission to access location was denied");
                return;
            }

            let loc = await Location.getCurrentPositionAsync({});
            setLocation({
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
            setLoading(false);
        })();
    }, []);

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#000" />
                <Text style={styles.loading}>Loading map...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Map View</Text>
                <Ionicons name="notifications-outline" size={24} color="#000" />
            </View>

            {/* Search */}
            <View style={styles.searchBar}>
                <Ionicons name="search" size={20} color="#888" />
                <TextInput placeholder="Search providers or services" style={{ flex: 1, marginLeft: 8 }} />
            </View>

            {/* Filters */}
            <View style={styles.filters}>
                <TouchableOpacity style={styles.filterBtn}><Text style={styles.filterText}>Handyman</Text></TouchableOpacity>
                <TouchableOpacity style={styles.filterBtn}><Text style={styles.filterText}>Cleaning</Text></TouchableOpacity>
                <TouchableOpacity style={styles.filterBtn}><Text style={styles.filterText}>Plumbing</Text></TouchableOpacity>
            </View>

            {/* Map */}
            <MapView
                style={styles.map}
                region={location || {
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                }}
                showsUserLocation={true}
            >
                {services.map((service) => (
                    <Marker
                        key={service.id}
                        coordinate={{ latitude: service.lat, longitude: service.lon }}
                        title={service.title}
                        description={service.type}
                    >
                        <Ionicons name="hammer-outline" size={30} color="red" />
                    </Marker>
                ))}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingBottom: 12,
        marginTop: 50
    },
    headerTitle: { fontSize: 16, fontWeight: "bold" },
    searchBar: {
        flexDirection: "row",
        backgroundColor: "#F0F0F0",
        marginHorizontal: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 8,
        alignItems: "center",
    },
    filters: { flexDirection: "row", paddingHorizontal: 16, marginVertical: 8 },
    filterBtn: {
        backgroundColor: "#E0E0E0",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
        marginRight: 8,
    },
    filterText: { fontSize: 12 },
    map: { flex: 1 },
    loader: { flex: 1, justifyContent: "center", alignItems: "center" },
    loading: {
        fontFamily: 'Poppins_700Bold'
    }
});
