import React, { useLayoutEffect } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProviderProfile = () => {
  const navigation = useNavigation();

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
        <Text style={styles.profileProviderName}>Sarah's Cleaning Services</Text>
      </View>
      <View style={styles.profileProviderNameDetails}>
        <View style={styles.profileImage}>
          <Image style={styles.userImage} source={require('../../../assets/user.png')}></Image>
        </View>
        <View style={styles.nameProvider}>
          <Text style={styles.profileProviderName}>Sarah's Cleaning Services</Text>
          <Text style={styles.reviews}>125 Reviews</Text>
          <Text style={styles.miles}>2.5 miles</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.serviesOffered}>
          <Text style={styles.servicesOfferedText}>Servies Offered</Text>
          <View style={styles.servicesOfferedBoxes1}>
            <View style={styles.textOfServices}>
              <Text style={styles.servicesOfferedTextName}>Standard Home Cleaning</Text>
              <Text style={styles.description}>Thorough cleaning of living areas, bedrooms, and bathrooms.</Text>
            </View>
            <View>
              <Text style={styles.price}>$75/hr</Text>
            </View>

          </View>

          <View style={styles.servicesOfferedBoxes1}>
            <View style={styles.textOfServices}>
              <Text style={styles.servicesOfferedTextName}>Standard Home Cleaning</Text>
              <Text style={styles.description}>Thorough cleaning of living areas, bedrooms, and bathrooms.</Text>
            </View>
            <View>
              <Text style={styles.price}>$75/hr</Text>
            </View>

          </View>

          <View style={styles.servicesOfferedBoxes1}>
            <View style={styles.textOfServices}>
              <Text style={styles.servicesOfferedTextName}>Standard Home Cleaning</Text>
              <Text style={styles.description}>Thorough cleaning of living areas, bedrooms, and bathrooms.</Text>
            </View>
            <View>
              <Text style={styles.price}>$75/hr</Text>
            </View>

          </View>
        </View>

        <View style={styles.availabilty}>
          <View style={styles.topText}>
            <Text style={styles.insiderText}>Availabilty</Text>
            <Text style={styles.insiderText}>This Week</Text>
          </View>
          <ScrollView horizontal
            showsHorizontalScrollIndicator={false}>

            <View style={styles.calendar}>
              <Text style={styles.dates}>Mon Dec 18</Text>
              <Text style={styles.dates}>Mon Dec 19</Text>
              <Text style={styles.dates}>Mon Dec 20</Text>
              <Text style={styles.dates}>Mon Dec 21</Text>
              <Text style={styles.dates}>Mon Dec 21</Text>


            </View>
          </ScrollView>
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
        </View>

        <View style={styles.btn}>
          <TouchableOpacity>
            <View style={styles.topBtn}>
              <Text onPress={() => navigation.navigate('BookServices')} style={styles.bookBtn}>Book Now</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.bottomBtn}>
            <Text style={styles.call}>Call</Text>
            <Text onPress={() => navigation.navigate('ChatScreen')} style={styles.chat}>Chat</Text>
          </View>
        </View>
      </ScrollView>
      {/* Add more UI below */}
    </View>
  );
};

export default ProviderProfile;
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
    gap: 10, // or use margin if gap isn't supported
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
  profileProviderNameDetails: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'wheat',
    // padding: 15,
    // borderRadius: 5,
    borderWidth: 0.3,
    padding: 15,
    borderRadius: 8,
    borderColor: '#3F370F',
    backgroundColor: '#f0f0f0'
  },
  userImage: {
    width: 100,
    height: 70,
  },
  reviews: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 20,
  },
  miles: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 15,
  },
  servicesOfferedText: {
    marginTop: 30,
    fontFamily: 'Poppins_700Bold',
    fontSize: 25,


  },
  serviesOffered: {
    borderWidth: 0.3,
    padding: 15,
    borderRadius: 8,
    borderColor: '#3F370F',
    backgroundColor: '#f0f0f0',
    marginTop: 50,
  },
  servicesOfferedBoxes1: {
    dipslay: 'flex',
    flexDirection: 'row',
    borderRadius: 8,
    borderColor: '#3F370F',
    backgroundColor: '#f0f0f0',
    borderWidth: 0.3,
    padding: 15,
    marginTop: 10,
    height: 100,

  },
  servicesOfferedTextName: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 20,
    color: '#3F370F'
  },
  description: {
    fontFamily: 'Poppins_400Regular'
  },
  price: {
    marginLeft: -50,
    fontSize: 20,
    color: '#3F370F',
    fontFamily: 'Poppins_700Bold',
  },
  textOfServices: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  topText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  availabilty: {
    borderWidth: 0.3,
    padding: 15,
    borderRadius: 8,
    borderColor: '#3F370F',
    backgroundColor: '#f0f0f0',
    marginTop: 50,
  },
  insiderText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 20
  },
  calendar: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    marginTop: 10
  },
  dates: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    fontFamily: 'Poppins_700Bold'
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
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    fontFamily: 'Poppins_700Bold'
  },
  time: {
    marginTop: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    marginTop: 30
  },
  bookBtn: {
    textAlign: 'center',
    padding: 15,
    backgroundColor: '#3F370F',
    color: '#fff',
    fontFamily: 'Poppins_700Bold',
    borderRadius: 8

  },
  bottomBtn: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  call: {
    padding: 10,
    borderWidth: 1,
    color: '#3F370F',
    width: 200,
    textAlign: 'center',
    borderRadius: 8,
    fontFamily: 'Poppins_400Regular'
  },
  chat: {
    padding: 10,
    borderWidth: 1,
    backgroundColor: '#3F370F',
    width: 200,
    textAlign: 'center',
    borderRadius: 8,
    color: '#fff',
    fontFamily: 'Poppins_400Regular'
  }
});
