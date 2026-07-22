// src/features/bets-board/components/StatsSubTabs.tsx
import React from 'react';
import type { SubTabType } from '../types';
import styles from './StatsSubTabs.module.css';

interface StatsSubTabsProps {
  activeSubTab: SubTabType;
  onSubTabChange: (subTab: SubTabType) => void;
}

export const StatsSubTabs: React.FC<StatsSubTabsProps> = ({ activeSubTab, onSubTabChange }) => {
  return (
    <div className={styles.subTabsContainer}>
      <button
        className={`${styles.subTabButton} ${activeSubTab === 'stats' ? styles.active : ''}`}
        onClick={() => onSubTabChange('stats')}
      >
        Stats
      </button>
      <button
        className={`${styles.subTabButton} ${activeSubTab === 'chart' ? styles.active : ''}`}
        onClick={() => onSubTabChange('chart')}
      >
        Chart
      </button>
    </div>
  );
};