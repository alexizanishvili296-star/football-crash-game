import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import Multiplier from '@components/ui/multipliers';

import { useClickOutside } from '@hooks/useClickOutside';

import styles from './MultiplierHistory.module.css';

const HISTORY_ODDS = [
  1.00, 1.08, 1.98, 1.88, 1.08, 34.12, 11.50, 22.13, 1.12, 1.78,
  1.00, 2.40, 56.40, 1300.12, 1.78, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00,
  1.08, 34.12, 11.50, 22.13, 1.12, 1.78, 1.00, 2.40, 56.40, 1300.12,
  1.78, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.08, 34.12, 11.50,
  22.13, 1.12, 1.78, 1.00, 2.40, 56.40, 1300.12, 1.78, 1.00, 1.00,
  1.00, 1.00, 1.00, 1.00, 1.08, 34.12, 11.50, 22.13, 1.12, 1.78,
  1.00, 2.40, 56.40, 1300.12, 1.78, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00,
  1.78, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.08, 34.12, 11.50,
  22.13, 1.12, 1.78, 1.00, 2.40, 56.40, 1300.12, 1.78, 1.00, 1.00,
  1.00, 1.00, 1.00, 1.00, 1.08, 34.12, 11.50, 22.13, 1.12, 1.78,
  1.00, 2.40, 56.40, 1300.12, 1.78, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00,
  1.00, 1.08, 1.98, 1.88, 1.08, 34.12, 11.50, 22.13, 1.12, 1.78,
  1.00, 2.40, 56.40, 1300.12, 1.78, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00,
  1.08, 34.12, 11.50, 22.13, 1.12, 1.78, 1.00, 2.40, 56.40, 1300.12,
  1.78, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.08, 34.12, 11.50,
  22.13, 1.12, 1.78, 1.00, 2.40, 56.40, 1300.12, 1.78, 1.00, 1.00,
  1.00, 1.00, 1.00, 1.00, 1.08, 34.12, 11.50, 22.13, 1.12, 1.78,
  1.00, 2.40, 56.40, 1300.12, 1.78, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00,
  1.78, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.08, 34.12, 11.50,
  22.13, 1.12, 1.78, 1.00, 2.40, 56.40, 1300.12, 1.78, 1.00, 1.00,
  1.00, 1.00, 1.00, 1.00, 1.08, 34.12, 11.50, 22.13, 1.12, 1.78,
  1.00, 2.40, 56.40, 1300.12, 1.78, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00,
];

export const MultiplierHistory: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const containerRef = useClickOutside(handleClose);

  useEffect(() => {
    if (!isOpen && wrapperRef.current) {
      wrapperRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isOpen]);

  return (
    <div ref={containerRef} className={styles.historyContainer}>
      <div className={`${styles.historyCard} ${isOpen ? styles.open : ''}`}>
        <div ref={wrapperRef} className={styles.multipliersWrapper}>
          {HISTORY_ODDS.map((odd, idx) => (
            <Multiplier key={idx} odd={odd} className={styles.historyMultiplier} />
          ))}
        </div>

        <button
          className={`${styles.arrowButton} ${isOpen ? styles.arrowOpen : ''}`}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={t('toggleMultiplierHistory')}
          type='button'
        >
          <svg
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className={styles.arrowIcon}
          >
            <path
              d='M6 9l6 6 6-6'
              stroke='var(--color-text-secondary)'
              strokeWidth='2.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
      </div>
    </div>
  );
};