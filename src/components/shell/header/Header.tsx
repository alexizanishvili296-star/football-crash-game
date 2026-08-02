import React from 'react';
import styles from './Header.module.css';

interface HeaderProps {
  balance?: string | number;
  currency?: string;
  onMenuClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  balance = '454.20',
  currency = 'USD',
  onMenuClick,
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.rightSection}>
        <div className={styles.balanceContainer}>
          <span className={styles.balanceLabel}>Balance</span>
          <span className={styles.balanceAmount}>
            {balance} {currency}
          </span>
        </div>

        <button
          type="button"
          className={styles.menuButton}
          onClick={onMenuClick}
          aria-label="Toggle menu"
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
            <line x1="4" y1="9" x2="20" y2="9" />
            <line x1="4" y1="15" x2="20" y2="15" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;