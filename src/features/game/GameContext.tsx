import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

export type GamePhase = 'betting' | 'playing' | 'crashed';
export type PlayerBetStatus = 'waiting' | 'active' | 'cashedOut' | 'lost';

export interface PlayerBet {
  id: string;
  amount: number;
  status: PlayerBetStatus;
  payout?: number;
  autoCashOutMultiplier?: number;
}

export interface GameBet {
  id: string;
  player: string;
  panelId: string;
  amount: number;
  placedAt: Date;
  status: PlayerBetStatus;
  multiplier?: number;
  payout?: number;
  isCurrentUser: boolean;
}

interface GameContextValue {
  phase: GamePhase;
  multiplier: number;
  countdownProgress: number;
  crashMultiplier: number | null;
  balance: number;
  bets: Record<string, PlayerBet | undefined>;
  betHistory: GameBet[];
  multiplierHistory: number[];
  roundId: number;
  placeBet: (panelId: string, amount: number, autoCashOutMultiplier?: number) => boolean;
  cancelBet: (panelId: string) => void;
  cashOut: (panelId: string) => void;
}


const INITIAL_MULTIPLIER_HISTORY = [
  1.00, 1.08, 1.98, 1.88, 1.08, 34.12, 11.50, 22.13, 1.12, 1.78,
  1.00, 2.40, 56.40, 1300.12, 1.78, 1.00, 1.00, 1.00, 1.00, 1.00,
    1.00, 1.08, 1.98, 1.88, 1.08, 34.12, 11.50, 22.13, 1.12, 1.78,
  1.00, 2.40, 56.40, 1300.12, 1.78, 1.00, 1.00, 1.00, 1.00, 1.00,
    1.00, 1.08, 1.98, 1.88, 1.08, 34.12, 11.50, 22.13, 1.12, 1.78,
  1.00, 2.40, 56.40, 1300.12, 1.78, 1.00, 1.00, 1.00, 1.00, 1.00,
    1.00, 1.08, 1.98, 1.88, 1.08, 34.12, 11.50, 22.13, 1.12, 1.78,
  1.00, 2.40, 56.40, 1300.12, 1.78, 1.00, 1.00, 1.00, 1.00, 1.00,
    1.00, 1.08, 1.98, 1.88, 1.08, 34.12, 11.50, 22.13, 1.12, 1.78,
  1.00, 2.40, 56.40, 1300.12, 1.78, 1.00, 1.00, 1.00, 1.00, 1.00,
    1.00, 1.08, 1.98, 1.88, 1.08, 34.12, 11.50, 22.13, 1.12, 1.78,
  1.00, 2.40, 56.40, 1300.12, 1.78, 1.00, 1.00, 1.00, 1.00, 1.00,
    1.00, 1.08, 1.98, 1.88, 1.08, 34.12, 11.50, 22.13, 1.12, 1.78,
  1.00, 2.40, 56.40, 1300.12, 1.78, 1.00, 1.00, 1.00, 1.00, 1.00,
    1.00, 1.08, 1.98, 1.88, 1.08, 34.12, 11.50, 22.13, 1.12, 1.78,
  1.00, 2.40, 56.40, 1300.12, 1.78, 1.00, 1.00, 1.00, 1.00, 1.00,
    1.00, 1.08, 1.98, 1.88, 1.08, 34.12, 11.50, 22.13, 1.12, 1.78,
  1.00, 2.40, 56.40, 1300.12, 1.78, 1.00, 1.00, 1.00, 1.00, 1.00,
];

const INITIAL_BET_HISTORY: GameBet[] = [
  { id: 'seed-1', player: 'G****t', panelId: 'seed', amount: 20, placedAt: new Date('2025-12-05T13:35:00'), status: 'lost', isCurrentUser: true },
  { id: 'seed-2', player: 'G****t', panelId: 'seed', amount: 10, placedAt: new Date('2025-12-05T13:35:00'), status: 'cashedOut', multiplier: 244.62, payout: 1.5, isCurrentUser: true },
  { id: 'seed-3', player: 'K****5', panelId: 'seed', amount: 15.5, placedAt: new Date('2025-12-05T13:35:00'), status: 'cashedOut', multiplier: 244.62, payout: 1.5, isCurrentUser: true },
  { id: 'seed-4', player: 'T****h', panelId: 'seed', amount: 10, placedAt: new Date('2025-12-05T13:35:00'), status: 'lost', isCurrentUser: true },
  { id: 'seed-5', player: 'T****h', panelId: 'seed', amount: 6, placedAt: new Date('2025-12-05T13:35:00'), status: 'cashedOut', multiplier: 244.62, payout: 1.5, isCurrentUser: true },
  { id: 'seed-6', player: 'T****h', panelId: 'seed', amount: 5.4, placedAt: new Date('2025-12-05T13:35:00'), status: 'lost', isCurrentUser: true },
  { id: 'seed-7', player: 'L****r', panelId: 'seed', amount: 6.5, placedAt: new Date('2025-12-05T13:35:00'), status: 'cashedOut', multiplier: 244.62, payout: 1.5, isCurrentUser: true },
  { id: 'seed-8', player: 'K****5', panelId: 'seed', amount: 10.5, placedAt: new Date('2025-12-05T13:35:00'), status: 'lost', isCurrentUser: true },
  { id: 'seed-9', player: 'O****i', panelId: 'seed', amount: 12, placedAt: new Date('2025-12-05T13:35:00'), status: 'cashedOut', multiplier: 244.62, payout: 1.5, isCurrentUser: true },
  { id: 'seed-10', player: 'O****i', panelId: 'seed', amount: 20, placedAt: new Date('2025-12-05T13:35:00'), status: 'lost', isCurrentUser: true },
  { id: 'seed-11', player: 'F****3', panelId: 'seed', amount: 2.5, placedAt: new Date('2025-12-05T13:35:00'), status: 'lost', isCurrentUser: true },
  { id: 'seed-12', player: 'F****3', panelId: 'seed', amount: 2.5, placedAt: new Date('2025-12-05T13:35:00'), status: 'lost', isCurrentUser: true },
  { id: 'seed-13', player: 'F****3', panelId: 'seed', amount: 2.5, placedAt: new Date('2025-12-05T13:35:00'), status: 'lost', isCurrentUser: true },
  { id: 'seed-14', player: 'G****t', panelId: 'seed', amount: 10, placedAt: new Date('2025-12-05T13:35:00'), status: 'cashedOut', multiplier: 244.62, payout: 1.5, isCurrentUser: true },
  { id: 'seed-15', player: 'K****5', panelId: 'seed', amount: 15.5, placedAt: new Date('2025-12-05T13:35:00'), status: 'cashedOut', multiplier: 244.62, payout: 1.5, isCurrentUser: true },
  { id: 'seed-16', player: 'T****h', panelId: 'seed', amount: 10, placedAt: new Date('2025-12-05T13:35:00'), status: 'lost', isCurrentUser: true },
];

const BETTING_DURATION = 7_000;
const TICK_DURATION = 80;
const GameContext = createContext<GameContextValue | null>(null);

const createCrashMultiplier = () => Number((1.12 + Math.random() * 7.88).toFixed(2));

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<GamePhase>('betting');
  const [multiplier, setMultiplier] = useState(1);
  const [countdownProgress, setCountdownProgress] = useState(0);
  const [crashMultiplier, setCrashMultiplier] = useState<number | null>(null);
  const [balance, setBalance] = useState(454.2);
  const [bets, setBets] = useState<Record<string, PlayerBet | undefined>>({});
  const [betHistory, setBetHistory] = useState<GameBet[]>(INITIAL_BET_HISTORY);
  const [multiplierHistory, setMultiplierHistory] = useState<number[]>(INITIAL_MULTIPLIER_HISTORY);
  const [roundId, setRoundId] = useState(1);
  const roundStartedAt = useRef(0);
  const crashAt = useRef(createCrashMultiplier());

  const startBettingRound = useCallback(() => {
    roundStartedAt.current = Date.now();
    crashAt.current = createCrashMultiplier();
    setPhase('betting');
    setMultiplier(1);
    setCountdownProgress(0);
    setCrashMultiplier(null);
    setBets({});
    setRoundId((round) => round + 1);
  }, []);

  useEffect(() => {
    if (phase === 'crashed') {
      const timeout = window.setTimeout(startBettingRound, 2_500);
      return () => window.clearTimeout(timeout);
    }

    const startedAt = Date.now();
    const timer = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;

      if (phase === 'betting') {
        const progress = Math.min(elapsed / BETTING_DURATION, 1);
        setCountdownProgress(progress);
        if (progress === 1) {
          setBets((current) => Object.fromEntries(Object.entries(current).map(([id, bet]) => [
            id,
            bet?.status === 'waiting' ? { ...bet, status: 'active' as const } : bet,
          ])));
          setBetHistory((history) => history.map((bet) => bet.status === 'waiting' ? { ...bet, status: 'active' } : bet));
          setPhase('playing');
          roundStartedAt.current = Date.now();
        }
        return;
      }

      // The curve starts gently (1.10, 1.20...) and accelerates as in crash games.
      const seconds = (Date.now() - roundStartedAt.current) / 1000;
      const nextMultiplier = Number(Math.exp(seconds * 0.105).toFixed(2));
      setMultiplier(nextMultiplier);

      setBets((current) => {
        const cashouts: PlayerBet[] = [];
        let changed = false;
        const next = Object.fromEntries(Object.entries(current).map(([id, bet]) => {
          if (!bet || bet.status !== 'active' || !bet.autoCashOutMultiplier || nextMultiplier < bet.autoCashOutMultiplier) {
            return [id, bet];
          }
          changed = true;
          cashouts.push(bet);
          return [id, { ...bet, status: 'cashedOut' as const, payout: bet.amount * nextMultiplier }];
        }));
        if (cashouts.length) {
          setBalance((balance) => Number((balance + cashouts.reduce((sum, bet) => sum + bet.amount * nextMultiplier, 0)).toFixed(2)));
          setBetHistory((history) => history.map((bet) => {
            const cashout = cashouts.find((item) => item.id === bet.id);
            return cashout ? { ...bet, status: 'cashedOut', multiplier: nextMultiplier, payout: cashout.amount * nextMultiplier } : bet;
          }));
        }
        return changed ? next : current;
      });

      if (nextMultiplier >= crashAt.current) {
        setMultiplier(crashAt.current);
          setCrashMultiplier(crashAt.current);
          setPhase('crashed');
          setMultiplierHistory((history) => [crashAt.current, ...history].slice(0, 120));
          setBets((current) => Object.fromEntries(
          Object.entries(current).map(([id, bet]) => [
            id,
            bet?.status === 'active' ? { ...bet, status: 'lost' as const } : bet,
          ]),
        ));
        setBetHistory((history) => history.map((bet) => (
          bet.status === 'active' ? { ...bet, status: 'lost' } : bet
        )));
      }
    }, TICK_DURATION);

    return () => window.clearInterval(timer);
  }, [phase, startBettingRound]);

  const placeBet = useCallback((panelId: string, amount: number, autoCashOutMultiplier?: number) => {
    if (phase !== 'betting' || !Number.isFinite(amount) || amount <= 0 || amount > balance || bets[panelId]) return false;
    const id = `${roundId}-${panelId}-${Date.now()}`;
    setBets((current) => current[panelId] ? current : {
      ...current,
      [panelId]: { id, amount, status: 'waiting', autoCashOutMultiplier },
    });
    setBetHistory((history) => [{
      id, panelId, player: 'You', amount, placedAt: new Date(), status: 'waiting', isCurrentUser: true,
    }, ...history]);
    setBalance((current) => Number((current - amount).toFixed(2)));
    return true;
  }, [balance, bets, phase, roundId]);

  const cancelBet = useCallback((panelId: string) => {
    if (phase !== 'betting') return;
    setBets((current) => {
      const next = { ...current };
      const bet = next[panelId];
      if (!bet) return current;
      delete next[panelId];
      setBalance((balance) => Number((balance + bet.amount).toFixed(2)));
      setBetHistory((history) => history.filter((item) => item.id !== bet.id));
      return next;
    });
  }, [phase]);

  const cashOut = useCallback((panelId: string) => {
    if (phase !== 'playing') return;
    setBets((current) => {
      const bet = current[panelId];
      if (!bet || bet.status !== 'active') return current;
      setBalance((balance) => Number((balance + bet.amount * multiplier).toFixed(2)));
      setBetHistory((history) => history.map((item) => item.id === bet.id ? {
        ...item, status: 'cashedOut', multiplier, payout: bet.amount * multiplier,
      } : item));
      return { ...current, [panelId]: { ...bet, status: 'cashedOut', payout: bet.amount * multiplier } };
    });
  }, [multiplier, phase]);

  const value = useMemo(() => ({
    phase, multiplier, countdownProgress, crashMultiplier, balance, bets, betHistory, multiplierHistory, roundId,
    placeBet, cancelBet, cashOut,
  }), [balance, bets, betHistory, cancelBet, cashOut, countdownProgress, crashMultiplier, multiplier, multiplierHistory, phase, placeBet, roundId]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
}
