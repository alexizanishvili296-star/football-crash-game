import React from 'react';
import type { TabType } from '../types';
import { useTranslation } from 'react-i18next';
import styles from './BetsTabs.module.css';

interface BetsTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BetsTabs: React.FC<BetsTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: TabType; label: string }[] = [
    { id: 'allBets', label: 'allBets' },
    { id: 'myBets', label: 'myBets' },
    { id: 'leaderboard', label: 'leaderboard' },
    { id: 'stats', label: 'stats' },
  ];

  const { t } = useTranslation();

  return (
    <div className={styles.tabsContainer}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`${styles.tabButton} ${activeTab === tab.id ? styles.active : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {t(tab.label)}
        </button>
      ))}
    </div>
  );
};