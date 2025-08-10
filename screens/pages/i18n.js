// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import AsyncStorage from '@react-native-async-storage/async-storage';

const resources = {
  en: {
    translation: {
      welcome: "Welcome",
      edit_profile: "Edit Profile",
      payment_methods: "Payment Methods",
      invite_friends: "Invite Friends",
      language: "Language",
      logout: "Logout"
    }
  },
  fr: {
    translation: {
      welcome: "Bienvenue",
      edit_profile: "Modifier le profil",
      payment_methods: "Méthodes de paiement",
      invite_friends: "Inviter des amis",
      language: "Langue",
      logout: "Se déconnecter"
    }
  },
  es: {
    translation: {
      welcome: "Bienvenido",
      edit_profile: "Editar perfil",
      payment_methods: "Métodos de pago",
      invite_friends: "Invitar amigos",
      language: "Idioma",
      logout: "Cerrar sesión"
    }
  }
};

export const changeAppLanguage = async (lang) => {
  await AsyncStorage.setItem('appLanguage', lang);
  i18n.changeLanguage(lang);
};

export const initI18n = async () => {
  let lang = await AsyncStorage.getItem('appLanguage');
  if (!lang) {
    lang = Localization.locale.split('-')[0]; // e.g., "en-US" → "en"
  }

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: lang,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false
      }
    });

  return i18n;
};
