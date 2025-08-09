import { initializeApp } from 'firebase/app';
import {
    getAuth,
    initializeAuth,
    getReactNativePersistence
} from 'firebase/auth';

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyApNaM1qhe4Mosr-oBN3JJCvVXBgaM4h3E",
    authDomain: "servicelocallink2025.firebaseapp.com",
    projectId: "servicelocallink2025",
    storageBucket: "servicelocallink2025.firebasestorage.app",
    messagingSenderId: "522305252879",
    appId: "1:522305252879:web:47861d07e349544c307d7a",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { auth };
const db = getFirestore(app);

export { db };