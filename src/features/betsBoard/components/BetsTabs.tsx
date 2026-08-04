import React from 'react';
import { useTranslation } from 'react-i18next';

import type { TabType } from '../types';

import styles from './BetsTabs.module.css';

interface BetsTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BetsTabs: React.FC<BetsTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: TabType; label: string }[] = [
    { id: 'allBets', label: 'allBets' },
    { id: 'myBets', label: 'myBets' },
    // { id: 'leaderboard', label: 'leaderboard' },
    { id: 'stats', label: 'stats' },
  ];

  const { t } = useTranslation();

  const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);

  return (
    <div
      className={styles.tabsContainer}
      role="tablist"
      aria-label={t('betsTabs')}
      style={
        {
          '--active-index': activeIndex >= 0 ? activeIndex : 0,
          '--tab-count': tabs.length,
        } as React.CSSProperties
      }
    >
      <div className={styles.indicator} />

      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={activeTab === tab.id}
          className={`${styles.tabButton} ${activeTab === tab.id ? styles.active : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {t(tab.label)}
        </button>
      ))}
    </div>
  );
};