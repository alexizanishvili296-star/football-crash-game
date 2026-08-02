import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en/common.json';
import ka from './locales/ka/common.json';

import { DEFAULT_LANGUAGE, getLanguageFromPath } from './config.ts';

const languageFromUrl =
  typeof window === 'undefined'
    ? DEFAULT_LANGUAGE
    : getLanguageFromPath(window.location.pathname);

if (typeof document !== 'undefined') {
  document.documentElement.lang = languageFromUrl;
}

i18n.use(initReactI18next).init({
  resources: {
    en: { common: en },
    ka: { common: ka },
  },
  lng: languageFromUrl,
  fallbackLng: DEFAULT_LANGUAGE,
  defaultNS: 'common',
  interpolation: { escapeValue: false },
});

export default i18n;
