import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import BetButton from '@components/ui/buttons/betButton';
import QuickBetButton from '@components/ui/buttons/quickBetButton';
import NumberInput from '@components/ui/inputs/numberInput';
import Switcher from '@components/ui/inputs/switcher';
import { useGame } from '@features/game/GameContext';

import styles from './BetControlPanel.module.css';

const DEFAULT_BET_AMOUNT = 1;

interface BetControlPanelProps {
  panelId?: string;
  currency?: string;
  presetAmounts?: number[];
  onBetSubmit?: (amount: number, isAutoBet: boolean, autoCashOutMultiplier?: number) => void;
  onCashOut?: (amount: number) => void;
  disabled?: boolean;
}

export default function BetControlPanel({
  panelId,
  currency = 'USD',
  presetAmounts = [2, 5, 10, 20.1],
  onBetSubmit,
  onCashOut,
  disabled = false,
}: BetControlPanelProps) {
  const [betAmount, setBetAmount] = useState(DEFAULT_BET_AMOUNT);
  const [autoBet, setAutoBet] = useState(false);
  const [autoCashOutEnabled, setAutoCashOutEnabled] = useState(false);
  const [cashOutMultiplier, setCashOutMultiplier] = useState(2);
  const { t } = useTranslation();
  const { phase, multiplier, bets, roundId, placeBet, cancelBet, cashOut } = useGame();
  const bet = bets[panelId ?? 'default'];
  const autoBetRound = useRef<number | null>(null);

  const hasBet = Boolean(bet);
  const isCashoutAvailable = phase === 'playing' && bet?.status === 'active';
  const isCancellable = phase === 'betting' && bet?.status === 'waiting';
  const cashoutValue = ((bet?.amount ?? betAmount) * multiplier).toFixed(2);
  const variant = isCashoutAvailable ? 'cashout' : isCancellable ? 'cancel' : 'bet';
  const isRoundLocked = phase === 'playing' || phase === 'crashed';

  useEffect(() => {
    if (!autoBet || phase !== 'betting' || bet || autoBetRound.current === roundId) return;
    const id = panelId ?? 'default';
    if (placeBet(id, betAmount, autoCashOutEnabled ? cashOutMultiplier : undefined)) {
      autoBetRound.current = roundId;
    }
  }, [autoBet, autoCashOutEnabled, bet, betAmount, cashOutMultiplier, panelId, phase, placeBet, roundId]);

  const handleBetAction = () => {
    const id = panelId ?? 'default';
    if (isCashoutAvailable && bet) {
      const payout = bet.amount * multiplier;
      cashOut(id);
      onCashOut?.(payout);
      return;
    }

    if (isCancellable) {
      cancelBet(id);
      return;
    }

    if (phase !== 'betting' || hasBet) return;
    if (placeBet(id, betAmount, autoCashOutEnabled ? cashOutMultiplier : undefined)) {
      onBetSubmit?.(betAmount, autoBet, autoCashOutEnabled ? cashOutMultiplier : undefined);
    }
  };

  return (
    <div className={styles.panel} data-panel-id={panelId}>
      <div className={styles.actionSection}>
        <div className={styles.amountSectionContainer}>
          <div className={styles.amountSection}>
            <NumberInput
              value={betAmount}
              step={0.5}
              min={0.1}
              decimals={2}
              disabled={disabled || hasBet || isRoundLocked}
              ariaLabel={t('betAmount')}
              onChange={setBetAmount}
            />
          </div>

          <div className={styles.presetsSection}>
            {presetAmounts.map((amount) => (
              <QuickBetButton
                key={amount}
                amount={amount}
                disabled={disabled || hasBet || isRoundLocked}
                ariaLabel={t('setBetAmount', { amount: amount.toFixed(2) })}
                onClick={setBetAmount}
              />
            ))}
          </div>
        </div>

        <div className={styles.betButtonContainer}>
          <BetButton
            title={t('bet')}
            titles={{ bet: t('bet'), cashout: t('cashout'), cancel: t('cancel'), freebet: t('freebet') }}
            value={betAmount.toFixed(2)}
            cashoutValue={cashoutValue}
            currency={currency}
            variant={variant}
            disabled={disabled || (phase !== 'betting' && !isCashoutAvailable)}
            onClick={handleBetAction}
            className={styles.betButtonCustom}
          />
        </div>
      </div>

      <div className={styles.footerSection}>
        <div className={styles.switchersGroup}>
          <Switcher label={t('autoBet')} enabled={autoBet} disabled={disabled || hasBet || isRoundLocked} onChange={setAutoBet} />
          <Switcher
            label={t('autoCashOut')}
            enabled={autoCashOutEnabled}
            disabled={disabled || hasBet || isRoundLocked}
            onChange={setAutoCashOutEnabled}
          />
        </div>

        <div className={styles.multiplierSection}>
          <NumberInput
            value={cashOutMultiplier}
            step={0.1}
            min={1.01}
            suffix='x'
            size='small'
            decimals={2}
            disabled={disabled || !autoCashOutEnabled}
            ariaLabel={t('autoCashOutMultiplier')}
            onChange={setCashOutMultiplier}
          />
        </div>
      </div>
    </div>
  );
}
