import React, { useState } from 'react';

import Multiplier from '@components/ui/multipliers';

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

  return (
    <div className={styles.historyContainer}>
      <div className={`${styles.historyCard} ${isOpen ? styles.open : ''}`}>
        <div className={styles.multipliersWrapper}>
          {HISTORY_ODDS.map((odd, idx) => (
            <Multiplier key={idx} odd={odd} className={styles.historyMultiplier} />
          ))}
        </div>

        <button
          className={`${styles.arrowButton} ${isOpen ? styles.arrowOpen : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle multiplier history"
          type="button"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.arrowIcon}
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="#9496a1"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};