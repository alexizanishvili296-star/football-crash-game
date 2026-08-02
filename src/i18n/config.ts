export const SUPPORTED_LANGUAGES = ['en', 'ka'] as const;
export const DEFAULT_LANGUAGE = 'en';

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

const isSupportedLanguage = (language: string | undefined): language is SupportedLanguage =>
  SUPPORTED_LANGUAGES.some((supportedLanguage) => supportedLanguage === language);

export const getLanguageFromPath = (pathname: string): SupportedLanguage => {
  const language = pathname.split('/').filter(Boolean)[0];

  return isSupportedLanguage(language) ? language : DEFAULT_LANGUAGE;
};
