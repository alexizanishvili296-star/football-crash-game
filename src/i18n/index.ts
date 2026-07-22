import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en/common.json';
import ka from './locales/ka/common.json';

import { DEFAULT_LANGUAGE } from './config.ts';

i18n.use(initReactI18next).init({
  resources: {
    en: { common: en },
    ka: { common: ka },
  },
  lng: DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  defaultNS: 'common',
  interpolation: { escapeValue: false },
});

export default i18n;
