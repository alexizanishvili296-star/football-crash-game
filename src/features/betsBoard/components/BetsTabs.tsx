import React from 'react';
import type { TabType } from '../types';
import styles from './BetsTabs.module.css';

interface BetsTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BetsTabs: React.FC<BetsTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: TabType; label: string }[] = [
    { id: 'allBets', label: 'All bets' },
    { id: 'myBets', label: 'My Bets' },
    { id: 'leaderboard', label: 'Leaderboard' },
    { id: 'stats', label: 'Stats' },
  ];

  return (
    <div className={styles.tabsContainer}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`${styles.tabButton} ${activeTab === tab.id ? styles.active : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};