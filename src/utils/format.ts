import type { SupportedLanguage } from '../i18n/config';

const LOCALES: Record<SupportedLanguage, string> = {
  en: 'en-US',
  ka: 'ka-GE',
};

export const getLocale = (language: string | undefined): string =>
  LOCALES[language as SupportedLanguage] ?? LOCALES.en;

export const formatCurrency = (amount: number, currency: string, language?: string): string =>
  new Intl.NumberFormat(getLocale(language), {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

export const formatMultiplier = (value: number, language?: string): string =>
  `${new Intl.NumberFormat(getLocale(language), {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)}x`;
