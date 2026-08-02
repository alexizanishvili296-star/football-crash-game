import { useEffect } from 'react';
import i18n from './index';
import { getLanguageFromPath } from './config';

const syncLanguageWithPath = () => {
  const language = getLanguageFromPath(window.location.pathname);

  document.documentElement.lang = language;

  if (i18n.resolvedLanguage !== language) {
    void i18n.changeLanguage(language);
  }
};

/* Keeps i18n in sync when the browser navigates through history. */
export const usePathLanguage = () => {
  useEffect(() => {
    syncLanguageWithPath();
    window.addEventListener('popstate', syncLanguageWithPath);

    return () => window.removeEventListener('popstate', syncLanguageWithPath);
  }, []);
};
