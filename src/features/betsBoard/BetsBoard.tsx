// src/features/bets-board/BetsBoard.tsx
import React, { useState } from 'react';
import { BetsTabs } from './components/BetsTabs';
import { BetsTable } from './components/BetsTable';
import { StatsSubTabs } from './components/StatsSubTabs';
import { StatsGrid } from './components/StatsGrid';
import { StatsChart } from './components/StatsChart'; // შემოტანილი ახალი კომპონენტი
import { useBets } from './hooks/useBets';
import type { SubTabType } from './types';
import styles from './BetsBoard.module.css';

export const BetsBoard: React.FC = () => {
  const { activeTab, setActiveTab, bets } = useBets();
  const [activeSubTab, setActiveSubTab] = useState<SubTabType>('stats');

  return (
    <div className={styles.boardWrapper}>
      {/* მთავარი ჩანართები */}
      <BetsTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* ქვე-ჩანართები Stats აქტიურობისას */}
      {activeTab === 'stats' && (
        <StatsSubTabs activeSubTab={activeSubTab} onSubTabChange={setActiveSubTab} />
      )}

      {/* კონტენტის დინამიური რენდერი */}
      {activeTab === 'stats' ? (
        activeSubTab === 'stats' ? (
          <StatsGrid />
        ) : (
          <StatsChart /> /* აქ ჩაჯდა ახალი ჩარტი */
        )
      ) : (
        <BetsTable bets={bets} activeTab={activeTab} />
      )}
    </div>
  );
};