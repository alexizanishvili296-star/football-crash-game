import React, { useState } from 'react';

import { BetsTabs } from './components/BetsTabs';
import { BetsTable } from './components/BetsTable';
import { StatsSubTabs } from './components/StatsSubTabs';
import { StatsGrid } from './components/StatsGrid';
import { StatsChart } from './components/StatsChart';

import { useBets } from './hooks/useBets';

import type { SubTabType } from './types';

import styles from './BetsBoard.module.css';

export const BetsBoard: React.FC = () => {
  const { activeTab, setActiveTab, bets } = useBets();
  const [activeSubTab, setActiveSubTab] = useState<SubTabType>('stats');

  return (
    <div className={styles.boardWrapper}>
      <BetsTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'stats' && (
        <StatsSubTabs activeSubTab={activeSubTab} onSubTabChange={setActiveSubTab} />
      )}

      {activeTab === 'stats' ? (
        activeSubTab === 'stats' ? (
          <StatsGrid />
        ) : (
          <StatsChart />
        )
      ) : (
        <BetsTable bets={bets} activeTab={activeTab} />
      )}
    </div>
  );
};