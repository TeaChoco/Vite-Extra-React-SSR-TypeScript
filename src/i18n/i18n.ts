//-Path: "vite-extra-react-ssr-ts/src/i18n.ts"
import i18n from 'i18next';
import enLocale from './locales/en.json';
import thLocale from './locales/th.json';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    th: { translation: thLocale },
    en: { translation: enLocale },
};

const isBrowser = typeof window !== 'undefined';

if (isBrowser) {
    i18n.use(LanguageDetector);
}

i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
    detection: {
        order: ['cookie', 'localStorage', 'navigator'],
        caches: ['cookie', 'localStorage'],
        lookupCookie: 'i18next',
        lookupLocalStorage: 'i18next',
        cookieMinutes: 10080,
    },
});

export default i18n;
