import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { SettingsDropdown } from '@features/menu/components/settingsDropdown/SettingsDropdown';

import { useClickOutside } from '@hooks/useClickOutside';

import styles from './Header.module.css';

interface HeaderProps {
  balance?: string | number;
  currency?: string;
  onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  balance = '454.20',
  currency = 'USD',
}) => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const menuRef = useClickOutside(closeMenu);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <div className={styles.rightSection}>
        <div className={styles.balanceContainer}>
          <span className={styles.balanceLabel}>{t('balance')}</span>
          <span className={styles.balanceAmount}>
            {balance} {currency}
          </span>
        </div>

        <div className={styles.menuContainer} ref={menuRef}>
          <button
            type="button"
            className={styles.menuButton}
            onClick={toggleMenu}
            aria-label={t('toggleMenu')}
            aria-haspopup="menu"
            aria-expanded={isMenuOpen}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="9" x2="20" y2="9" />
                  <line x1="4" y1="15" x2="20" y2="15" />
                </>
              )}
            </svg>
          </button>

          <div className={styles.dropdownWrapper}>
            <SettingsDropdown isOpen={isMenuOpen} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;