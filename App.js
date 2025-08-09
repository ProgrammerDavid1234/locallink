import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Image, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig';

// Screens
import GetStarted from './screens/pages/GetStarted';
import Signup from './screens/pages/signup/Signup';
import Login from './screens/pages/login/Login';
import Home from './screens/pages/Home/Home';
import ProviderProfile from './screens/pages/ProviderProfile/ProviderProfile';
import BookServices from './screens/pages/BookServices/BookServices';
import ChatScreen from './screens/pages/Chat/ChatScreen';
import Request from './screens/pages/Request/Request';
import UserProfilePage from './screens/pages/UserProfilePage/UserProfilePage';

// Prevent splash auto-hide
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStackNavigator = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  const [initialRoute, setInitialRoute] = useState(null);

  // ✅ Listen to auth state + persist token
  useEffect(() => {
    const checkAuth = async () => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          console.log('Logged in:', user.email);
          await AsyncStorage.setItem('userToken', user.uid);
          setInitialRoute('Main');
        } else {
          await AsyncStorage.removeItem('userToken');
          setInitialRoute('Login');
        }
      });

      return unsubscribe;
    };

    checkAuth();
  }, []);

  // ✅ Splash screen control
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded || initialRoute === null) return null; // Prevent hook order issue

  // ✅ Home Stack
  const HomeStack = () => (
    <HomeStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <HomeStackNavigator.Screen name="HomeScreen" component={Home} />
      <HomeStackNavigator.Screen name="ProviderProfile" component={ProviderProfile} />
      <HomeStackNavigator.Screen name="BookServices" component={BookServices} />
      <HomeStackNavigator.Screen name="ChatScreen" component={ChatScreen} />
      <HomeStackNavigator.Screen name="Request" component={Request} />
      <HomeStackNavigator.Screen name="UserProfilePage" component={UserProfilePage} />
    </HomeStackNavigator.Navigator>
  );

  // ✅ Bottom Tabs
  const MainTabs = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#ddd',
          height: 70,
          paddingBottom: 10,
        },
        tabBarIcon: ({ focused }) => {
          let icon;
          if (route.name === 'Home') icon = require('./assets/home.png');
          else if (route.name === 'Requests') icon = require('./assets/request.png');
          else if (route.name === 'Chat') icon = require('./assets/chat.png');
          else if (route.name === 'Profile') icon = require('./assets/user.png');

          return (
            <Image
              source={icon}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#3F370F' : '#999',
              }}
            />
          );
        },
        tabBarLabel: ({ focused }) => (
          <Text style={{ color: focused ? '#3F370F' : '#999', fontSize: 12 }}>
            {route.name}
          </Text>
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Requests" component={Request} />
      <Tab.Screen name="Chat" component={Home} />
      <Tab.Screen name="Profile" component={UserProfilePage} />
    </Tab.Navigator>
  );

  // ✅ Navigation
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer onReady={onLayoutRootView}>
        <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
          <Stack.Screen name="GetStarted" component={GetStarted} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Main" component={MainTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
