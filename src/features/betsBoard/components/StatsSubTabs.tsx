import React from 'react';
import { useTranslation } from 'react-i18next';

import type { SubTabType } from '../types';

import styles from './StatsSubTabs.module.css';

interface StatsSubTabsProps {
  activeSubTab: SubTabType;
  onSubTabChange: (subTab: SubTabType) => void;
}

export const StatsSubTabs: React.FC<StatsSubTabsProps> = ({ activeSubTab, onSubTabChange }) => {

  const { t } = useTranslation();

  return (
    <div className={styles.subTabsContainer} role="tablist" aria-label={t('statisticsTabs')}>
      <button
        className={`${styles.subTabButton} ${activeSubTab === 'stats' ? styles.active : ''}`}
        type="button"
        role="tab"
        aria-selected={activeSubTab === 'stats'}
        onClick={() => onSubTabChange('stats')}
      >
        {t('stats')}
      </button>
      <button
        className={`${styles.subTabButton} ${activeSubTab === 'chart' ? styles.active : ''}`}
        type="button"
        role="tab"
        aria-selected={activeSubTab === 'chart'}
        onClick={() => onSubTabChange('chart')}
      >
        {t('chart')}
      </button>
    </div>
  );
};