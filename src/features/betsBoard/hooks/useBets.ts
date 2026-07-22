// src/features/bets-board/hooks/useBets.ts
import { useState, useMemo } from 'react';
import type { Bet, TabType } from '../types';

const MOCK_BETS: Bet[] = [
  { id: '1', player: 'G****t', date: '5.12.2025', time: '13:35', betAmount: 20.00, isCurrentUser: true },
  { id: '2', player: 'G****t', date: '5.12.2025', time: '13:35', betAmount: 10.00, multiplier: 244.62, cashout: 1.500, isCurrentUser: true },
  { id: '3', player: 'K****5', date: '5.12.2025', time: '13:35', betAmount: 15.50, multiplier: 244.62, cashout: 1.500, isCurrentUser: true },
  { id: '4', player: 'T****h', date: '5.12.2025', time: '13:35', betAmount: 10.00, isCurrentUser: true },
  { id: '5', player: 'T****h', date: '5.12.2025', time: '13:35', betAmount: 6.00, multiplier: 244.62, cashout: 1.500, isCurrentUser: true },
  { id: '6', player: 'T****h', date: '5.12.2025', time: '13:35', betAmount: 5.40, isCurrentUser: true },
  { id: '7', player: 'L****r', date: '5.12.2025', time: '13:35', betAmount: 6.50, multiplier: 244.62, cashout: 1.500, isCurrentUser: true },
  { id: '8', player: 'K****5', date: '5.12.2025', time: '13:35', betAmount: 10.50, isCurrentUser: true },
  { id: '9', player: 'O****i', date: '5.12.2025', time: '13:35', betAmount: 12.00, multiplier: 244.62, cashout: 1.500, isCurrentUser: true },
  { id: '10', player: 'O****i', date: '5.12.2025', time: '13:35', betAmount: 20.00, isCurrentUser: true },
  { id: '11', player: 'F****3', date: '5.12.2025', time: '13:35', betAmount: 2.50, isCurrentUser: true },
  { id: '12', player: 'F****3', date: '5.12.2025', time: '13:35', betAmount: 2.50, isCurrentUser: true },
  { id: '13', player: 'F****3', date: '5.12.2025', time: '13:35', betAmount: 2.50, isCurrentUser: true },
  { id: '14', player: 'G****t', date: '5.12.2025', time: '13:35', betAmount: 10.00, multiplier: 244.62, cashout: 1.500, isCurrentUser: true },
  { id: '15', player: 'K****5', date: '5.12.2025', time: '13:35', betAmount: 15.50, multiplier: 244.62, cashout: 1.500, isCurrentUser: true },
  { id: '16', player: 'T****h', date: '5.12.2025', time: '13:35', betAmount: 10.00, isCurrentUser: true },
];

export const useBets = () => {
  const [activeTab, setActiveTab] = useState<TabType>('allBets');

  const filteredBets = useMemo(() => {
    if (activeTab === 'myBets') {
      return MOCK_BETS.filter(bet => bet.isCurrentUser);
    }
    return MOCK_BETS;
  }, [activeTab]);

  return {
    activeTab,
    setActiveTab,
    bets: filteredBets,
  };
};