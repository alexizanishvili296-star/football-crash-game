import React from 'react';
import styles from './StatsGrid.module.css';
import Multiplier from '../../../components/ui/multipliers';

const MOCK_ODDS = [
  1.12, 2.40, 34.12, 56.40, 1.12,
  2.40, 1.12, 1.12, 1.12, 1.12,
  1.12, 1.12, 1.12, 1.12, 56.40,
  56.40, 1.12, 2.40, 56.40, 1.12,
  1.12, 1.12, 1.12, 1.12, 1.12,
  1.12, 2.40, 34.12, 34.12, 1.12,
  1.12, 1.12, 1.12, 1.12, 34.12,
  2.40, 1.12, 1.12, 1.12, 1.12,
  1.12, 1.12, 34.12, 34.12, 1.12,
  56.40, 1.12, 56.40, 1.12, 1.12,
  34.12, 1.12, 34.12, 34.12, 1.12,
  56.40, 34.12, 56.40, 56.40, 34.12,
  1.12, 56.40, 56.40, 56.40, 56.40,
  34.12, 56.40, 1.12, 1.12, 1.12,
  56.40, 1.12, 34.12, 34.12, 56.40,
  56.40, 34.12, 34.12, 56.40, 34.12,
  34.12, 56.40, 1.12, 1.12, 56.40,
  56.40, 1.12, 56.40
];

export const StatsGrid: React.FC = () => {
  return (
    <div className={styles.gridContainer}>
      {MOCK_ODDS.map((odd, index) => (
        <Multiplier key={index} odd={odd} className={styles.customMultiplier} />
      ))}
    </div>
  );
};