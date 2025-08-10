import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
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
import Confirm from './screens/pages/Confirm/Confirm';
import InviteFriends from './screens/pages/InviteFriends/InviteFriends';
import EditProfile from './screens/pages/EditProfile/EditProfile';
import PaymentMethodsHistory from './screens/pages/PaymentMethodHistory/PaymentMethodsHistory';
import HelpSupport from './screens/pages/HelpSupport/HelpSupport';
import Map from './screens/pages/Map/Map';

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
  const [isDarkTheme, setIsDarkTheme] = useState(false); // ✅ Theme state

  // ✅ Listen to auth state + persist token
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await AsyncStorage.setItem('userToken', user.uid);
        setInitialRoute('Main');
      } else {
        await AsyncStorage.removeItem('userToken');
        setInitialRoute('Login');
      }
    });

    return unsubscribe;
  }, []);

  // ✅ Splash screen control
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded || initialRoute === null) return null;

  // ✅ Home Stack
  const HomeStack = () => (
    <HomeStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <HomeStackNavigator.Screen name="HomeScreen">
        {props => <Home {...props} isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme} />}
      </HomeStackNavigator.Screen>
      <HomeStackNavigator.Screen name="ProviderProfile" component={ProviderProfile} />
      <HomeStackNavigator.Screen name="BookServices" component={BookServices} />
      <HomeStackNavigator.Screen name="ChatScreen" component={ChatScreen} />
      <HomeStackNavigator.Screen name="Request" component={Request} />
      <HomeStackNavigator.Screen name="UserProfilePage">
        {props => (
          <UserProfilePage
            {...props}
            isDarkTheme={isDarkTheme}
            setIsDarkTheme={setIsDarkTheme}
          />
        )}
      </HomeStackNavigator.Screen>
      <HomeStackNavigator.Screen name="Confirm" component={Confirm} />
    </HomeStackNavigator.Navigator>
  );

  // ✅ Bottom Tabs
  const MainTabs = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDarkTheme ? '#222' : '#fff',
          borderTopWidth: 1,
          borderTopColor: isDarkTheme ? '#555' : '#ddd',
          height: 70,
          paddingBottom: 10,
        },
        tabBarIcon: ({ focused }) => {
          let icon;
          if (route.name === 'Home') icon = require('./assets/home.png');
          else if (route.name === 'Requests') icon = require('./assets/request.png');
          else if (route.name === 'Maps') icon = require('./assets/maps.png');
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
      <Tab.Screen name="Maps" component={Map} />
      <Tab.Screen name="Chat" component={Home} />
      <Tab.Screen name="Profile">
        {props => (
          <UserProfilePage
            {...props}
            isDarkTheme={isDarkTheme}
            setIsDarkTheme={setIsDarkTheme}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );

  // ✅ Navigation
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer
        theme={isDarkTheme ? DarkTheme : DefaultTheme}
        onReady={onLayoutRootView}
      >
        <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
          <Stack.Screen name="GetStarted" component={GetStarted} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="InviteFriends" component={InviteFriends} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="PaymentMethodsHistory" component={PaymentMethodsHistory} />
          <Stack.Screen name="HelpSupport" component={HelpSupport} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
