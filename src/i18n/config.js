import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import enTranslation from '@/i18n/locales/en/translation.json';
import esTranslation from '@/i18n/locales/es/translation.json';

export const supportedLanguages = {
  en: 'Engish',
  es: 'Espanol',
};

i18n
  .use(LanguageDetector)
  .use(HttpApi)
  .use(initReactI18next)
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    supportedLngs: Object.keys(supportedLanguages),
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: enTranslation,
      },
      es: {
        translation: esTranslation,
      },
    },
  });

export default i18n;
