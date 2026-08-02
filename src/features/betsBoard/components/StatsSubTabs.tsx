import React from 'react';
import type { SubTabType } from '../types';

import { useTranslation } from 'react-i18next';

import styles from './StatsSubTabs.module.css';

interface StatsSubTabsProps {
  activeSubTab: SubTabType;
  onSubTabChange: (subTab: SubTabType) => void;
}

export const StatsSubTabs: React.FC<StatsSubTabsProps> = ({ activeSubTab, onSubTabChange }) => {

  const { t } = useTranslation();

  return (
    <div className={styles.subTabsContainer}>
      <button
        className={`${styles.subTabButton} ${activeSubTab === 'stats' ? styles.active : ''}`}
        onClick={() => onSubTabChange('stats')}
      >
        {t('stats')}
      </button>
      <button
        className={`${styles.subTabButton} ${activeSubTab === 'chart' ? styles.active : ''}`}
        onClick={() => onSubTabChange('chart')}
      >
        {t('chart')}
      </button>
    </div>
  );
};