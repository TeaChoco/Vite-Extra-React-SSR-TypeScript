//-Path: 'Vite-Extra-React-SSR-TypeScript/src/i18n.ts"
import i18n from 'i18next';
import enLocale from './locales/en-US.json';
import thLocale from './locales/th-TH.json';
import jaLocale from './locales/ja-JP.json';
import zhLocale from './locales/zh-CN.json';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    'en-US': { translation: enLocale },
    'th-TH': { translation: thLocale },
    'ja-JP': { translation: jaLocale },
    'zh-CN': { translation: zhLocale },
} as const;

export const SUPPORTED_LANGS = Object.keys(resources) as (keyof typeof resources)[];
export type Lang = (typeof SUPPORTED_LANGS)[number];

export const isValidLang = (lang: string): lang is Lang => SUPPORTED_LANGS.includes(lang as Lang);

const isBrowser = typeof window !== 'undefined';

if (isBrowser) i18n.use(LanguageDetector);

i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'en-US',
    interpolation: { escapeValue: false },
    detection: {
        order: ['cookie', 'localStorage', 'navigator'],
        caches: ['cookie', 'localStorage'],
        lookupCookie: 'i18next',
        cookieMinutes: 10080,
        lookupLocalStorage: 'i18next',
    },
});

export default i18n;
