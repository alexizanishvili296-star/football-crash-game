// src/features/bets-board/hooks/useBets.ts
import { useState, useMemo } from 'react';
import { useGame } from '@features/game/GameContext';
import type { Bet, TabType } from '../types';

export const useBets = () => {
  const [activeTab, setActiveTab] = useState<TabType>('allBets');
  const { betHistory } = useGame();

  const allBets = useMemo<Bet[]>(() => betHistory.map((bet) => ({
    id: bet.id,
    player: bet.player,
    date: bet.placedAt.toLocaleDateString(),
    time: bet.placedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    betAmount: bet.amount,
    multiplier: bet.multiplier,
    cashout: bet.payout,
    isCurrentUser: bet.isCurrentUser,
  })), [betHistory]);

  const filteredBets = useMemo(() => {
    if (activeTab === 'myBets') {
      return allBets.filter(bet => bet.isCurrentUser);
    }
    return allBets;
  }, [activeTab, allBets]);

  return {
    activeTab,
    setActiveTab,
    bets: filteredBets,
  };
};
