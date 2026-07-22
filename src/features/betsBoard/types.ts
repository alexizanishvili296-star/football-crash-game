// src/features/bets-board/types.ts

export type TabType = 'allBets' | 'myBets' | 'leaderboard' | 'stats';
export type SubTabType = 'stats' | 'chart';

export interface Bet {
  id: string;
  player: string;
  date: string;
  time: string;
  betAmount: number;
  multiplier?: number;
  cashout?: number;
  isCurrentUser?: boolean;
}