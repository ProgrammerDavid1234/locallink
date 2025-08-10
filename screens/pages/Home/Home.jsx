import React, { useLayoutEffect, useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Image, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const navigation = useNavigation();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');


    const filteredServices = services.filter(service => {
        const name = service.businessName?.toLowerCase() || '';
        const category = service.category?.toLowerCase() || '';
        const search = searchQuery.toLowerCase();
        const selected = selectedCategory.toLowerCase();

        // Search query match
        const matchesSearch = name.includes(search);

        // Category match (check for keyword presence)
        const matchesCategory = selectedCategory
            ? category.includes(selected) || name.includes(selected)
            : true;

        return matchesSearch && matchesCategory;
    });



    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await fetch('https://locallink-backend-74mz.onrender.com/api/service-providers');
                const data = await res.json();
                console.log('Fetched services:', data);

                if (res.ok && Array.isArray(data.data)) {
                    setServices(data.data); // ✅ Directly set the array
                } else {
                    console.error('Invalid services format:', data);
                    setServices([]); // Prevent map crash
                }
            } catch (error) {
                console.error('Fetch error:', error);
                setServices([]);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);


    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#3F370F" />
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <View style={styles.topContentMain}>
                <View style={styles.topContent}>
                    <View style={styles.brand}>
                        {/* <Image style={styles.topImage} source={require('../../../assets/logo.png')} /> */}
                        <Text style={styles.logoText}>LocalLink</Text>
                    </View>
                    {/* <Image 
                        onPress={() => navigation.navigate('UserProfilePage')}
                        source={require('../../../assets/logo.png')}
                        style={styles.logo}
                    /> */}
                </View>


                <View style={{ flexDirection: 'row', alignItems: 'center', width: '95%' }}>
                    <View style={[styles.search, { flex: 1, marginRight: 10 }]}>
                        <Image
                            source={require('../../../assets/search.png')}
                            style={styles.searchIcon}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="What do you need?"
                            placeholderTextColor="#aaa"
                            value={searchQuery}
                            onChangeText={(text) => setSearchQuery(text)}
                        />
                    </View>
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <Text style={{ color: '#3F370F', fontSize: 16, fontFamily: 'Poppins_700Bold' }}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>

            </View>

            <View style={styles.categories}>
                <Text style={styles.categoryTextMain}>Categories</Text>
                {/* Categories can be added here */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoriesCircle}
                >
                    <TouchableOpacity onPress={() => setSelectedCategory('Carpenter')}>
                        <View style={styles.firstCategory}>
                            <Image style={styles.categoryImage} source={require('../../../assets/carpenter.png')} />
                            <Text style={styles.categoryText}>Carpenter</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setSelectedCategory('Barber')}>
                        <View style={styles.secondCategory}>
                            <Image style={styles.categoryImage} source={require('../../../assets/clippers.png')}></Image>
                            <Text style={styles.categoryText}>Barber</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setSelectedCategory('Electrician')}>
                        <View style={styles.thirdCategory}>
                            <Image style={styles.categoryImage} source={require('../../../assets/electrician.png')}></Image>
                            <Text style={styles.categoryText}>Electrician</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setSelectedCategory('Plumbing')}>
                        <View style={styles.fourthCategory} >
                            <Image style={styles.categoryImage} source={require('../../../assets/plumbling.png')}></Image>
                            <Text style={styles.categoryText}>Plumber</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setSelectedCategory('Mechanic')}>
                        <View style={styles.fifthCategory}>
                            <Image style={styles.categoryImage} source={require('../../../assets/mechanic.png')}></Image>
                            <Text style={styles.categoryText}>Mechanic</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSelectedCategory('Hairdresser')}>
                        <View style={styles.sixthCategory}>
                            <Image style={styles.categoryImage} source={require('../../../assets/female.png')}></Image>
                            <Text style={styles.categoryText}>Hair Dresser</Text>
                        </View>

                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => setSelectedCategory('')}>
                        <View style={styles.firstCategory}>
                            <Image style={styles.categoryImage} source={require('../../../assets/female.png')} />
                            <Text style={styles.categoryText}>All</Text>
                        </View>
                    </TouchableOpacity>

                </ScrollView>
            </View>

            <View style={styles.nearByServies}>
                <Text style={styles.servicesText}>Top Nearby Services</Text>
                {/* Services can be added here */}
                <ScrollView showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.servicesContainer}>
                        {filteredServices.map((service) => (
                            <View key={service._id} style={styles.serviceCard}>
                                <TouchableOpacity>
                                    <Image
                                        style={styles.serviceImage}
                                        source={
                                            service.image
                                                ? { uri: `https://locallink-backend-74mz.onrender.com/${service.image}` }
                                                : require('../../../assets/plumber.jpeg') // fallback
                                        }
                                    />
                                </TouchableOpacity>
                                <Text style={styles.serviceText}>{service.businessName}</Text>
                                <View style={styles.ratingContainer}>
                                    <Image
                                        style={styles.rating}
                                        source={require('../../../assets/star.png')}
                                    />
                                    <Text style={styles.ratingText}>4.5</Text>
                                </View>
                                <Text style={styles.meters}>1.5 Meters</Text>
                                <View style={styles.serviceButton}>
                                    <TouchableOpacity>
                                        <Text
                                            style={styles.serviceButtonTextBook}
                                            onPress={() => navigation.navigate('ProviderProfile')}
                                        >
                                            Book
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Text style={styles.serviceButtonTextMessage}>Message</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>

                </ScrollView>
            </View>

        </View>

    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    topContentMain: {
        width: '100%',
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#3F370F',
    },
    topContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        width: '100%',
    },
    topText: {
        fontFamily: 'Poppins_700Bold',
        color: '#3F370F',
        marginBottom: 0,
        marginRight: 20,
    },
    topImage: {
        width: 80,
        height: 50,
        resizeMode: 'contain',

    },
    logoText: {
        fontSize: 24,
        fontFamily: 'Poppins_700Bold',
        color: '#3F370F',
        marginLeft: 0, // spacing between logo and text
    },

    logo: {
        width: 80,
        height: 50,
        resizeMode: 'contain',
        marginBottom: 10,
        paddingRight: 0,
    },
    search: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderWidth: 1, // Ensure border is visible
        borderColor: '#3F370F', // Light olive
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 45,
        margin: 20,
        width: '90%',
    },

    searchIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    brand: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    categories: {
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    categoryText: {
        fontSize: 20,
        fontFamily: 'Poppins_700Bold',
        color: '#3F370F',
        marginBottom: 10,
    },
    categoryTextMain: {
        fontSize: 24,
        fontFamily: 'Poppins_700Bold',
        color: '#3F370F',
        marginBottom: 10,
    },
    categoriesCircle: {
        flexDirection: 'row',
        marginTop: 20,
        gap: 10,
    },
    firstCategory: {
        alignItems: 'center',
        marginRight: 10,
    },
    secondCategory: {
        flex: 1,
        alignItems: 'center',
        marginRight: 10,
    },
    thirdCategory: {
        flex: 1,
        alignItems: 'center',
        marginRight: 10,
    },
    fourthCategory: {
        flex: 1,
        alignItems: 'center',
        marginRight: 10,
    },
    fifthCategory: {
        flex: 1,
        alignItems: 'center',
        marginRight: 10,
    },
    sixthCategory: {
        flex: 1,
        alignItems: 'center',
        marginRight: 10,
    },
    categoryImage: {
        width: 50,
        height: 50,
        marginBottom: 5,
    },
    categoryText: {
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        color: '#333',
    },
    nearByServies: {
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    servicesText: {
        fontSize: 24,
        fontFamily: 'Poppins_700Bold',
        color: '#3F370F',
        marginBottom: 10,
        marginTop: 20,
    },
    servicesDiv: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    firstService: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        padding: 10,
        marginBottom: 50,
        display: 'flex',
        gap: 5,
        shadowRadius: 4,
    },
    serviceImage: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        marginBottom: 10,
    },
    serviceText: {
        fontSize: 18,
        fontFamily: 'Poppins_700Bold',
        color: '#3F370F',
        marginBottom: 5,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        marginRight: 10,
    },
    rating: {
        width: 100,
        height: 20,
        marginRight: 5,
    },
    ratingText: {
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        color: '#333',
    },
    meters: {
        fontSize: 14,
        fontFamily: 'Poppins_400Regular',
        color: '#999',
        marginBottom: 10,
    },
    serviceButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    serviceButtonTextMessage: {
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        color: '#fff',
        backgroundColor: '#3F370F',
        padding: 10,
        paddingHorizontal: 30,
        borderRadius: 5,
        marginLeft: 10,
    },
    serviceButtonTextBook: {
        fontSize: 16,
        fontFamily: 'Poppins_700Bold',
        borderWidth: 1,
        borderColor: '#3F370F',
        color: '#3F370F',
        backgroundColor: 'transparent',
        padding: 10,
        paddingHorizontal: 45,
        borderRadius: 5,
        marginLeft: -10,
    },
    secondService: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        padding: 10,
        marginTop: 120,
        display: 'flex',
        gap: 5,
        shadowRadius: 4,
    },
    scrollContainer: {
        padding: 10,

    },
    scrollContainer: {
        paddingVertical: 20,
        paddingHorizontal: 16,
    },

    servicesDiv: {
        flexDirection: 'column',
        gap: 20, // or use marginBottom on individual cards
    },

    serviceCard: {
        borderRadius: 10,
        marginBottom: 20,

    },

});
