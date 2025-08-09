// authService.js
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail,
    updateProfile,
    getAuth
} from 'firebase/auth';
import { auth } from './firebaseConfig';

// Sign up new user
export const signUp = async (email, password, username) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Set display name (username)
        await updateProfile(userCredential.user, {
            displayName: username,
        });

        return userCredential.user;
    } catch (error) {
        throw error;
    }
};


// Login existing user
export const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        throw error;
    }
};

// Logout user
export const logout = async () => {
    const auth = getAuth();
    return signOut(auth);
};
// Get current user
export const getCurrentUser = () => {
    return auth.currentUser;
};

// Listen to user auth state change (e.g., for checking if logged in)
export const onAuthChange = (callback) => {
    return onAuthStateChanged(auth, callback);
};

// Send password reset email
export const resetPassword = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error) {
        throw error;
    }
};

// Update user profile (e.g., display name, photo URL)
export const updateUserProfile = async (updates) => {
    try {
        const user = auth.currentUser;
        if (user) {
            await updateProfile(user, updates); // { displayName: "David", photoURL: "url" }
        }
    } catch (error) {
        throw error;
    }
};
