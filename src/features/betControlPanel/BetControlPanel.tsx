import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import BetButton from '@components/ui/buttons/betButton';
import QuickBetButton from '@components/ui/buttons/quickBetButton';
import NumberInput from '@components/ui/inputs/numberInput';
import Switcher from '@components/ui/inputs/switcher';

import styles from './BetControlPanel.module.css';

const DEFAULT_BET_AMOUNT = 1;

interface BetControlPanelProps {
  panelId?: string;
  currency?: string;
  presetAmounts?: number[];
  currentMultiplier?: number;
  onBetSubmit?: (amount: number, isAutoBet: boolean, autoCashOutMultiplier?: number) => void;
  onCashOut?: (amount: number) => void;
  disabled?: boolean;
}

export default function BetControlPanel({
  panelId,
  currency = 'USD',
  presetAmounts = [2, 5, 10, 20.1],
  currentMultiplier = 1,
  onBetSubmit,
  onCashOut,
  disabled = false,
}: BetControlPanelProps) {
  const [betAmount, setBetAmount] = useState(DEFAULT_BET_AMOUNT);
  const [autoBet, setAutoBet] = useState(false);
  const [autoCashOutEnabled, setAutoCashOutEnabled] = useState(false);
  const [cashOutMultiplier, setCashOutMultiplier] = useState(2);
  const [placedBetAmount, setPlacedBetAmount] = useState<number | null>(null);
  const { t } = useTranslation();

  const hasActiveBet = placedBetAmount !== null;
  const cashoutValue = ((placedBetAmount ?? betAmount) * currentMultiplier).toFixed(2);

  const handleBetAction = () => {
    if (hasActiveBet) {
      onCashOut?.((placedBetAmount ?? 0) * currentMultiplier);
      setPlacedBetAmount(null);
      setBetAmount(DEFAULT_BET_AMOUNT);
      return;
    }

    setPlacedBetAmount(betAmount);
    onBetSubmit?.(betAmount, autoBet, autoCashOutEnabled ? cashOutMultiplier : undefined);
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
              disabled={disabled || hasActiveBet}
              ariaLabel={t('betAmount')}
              onChange={setBetAmount}
            />
          </div>

          <div className={styles.presetsSection}>
            {presetAmounts.map((amount) => (
              <QuickBetButton
                key={amount}
                amount={amount}
                disabled={disabled || hasActiveBet}
                ariaLabel={t('setBetAmount', { amount: amount.toFixed(2) })}
                onClick={setBetAmount}
              />
            ))}
          </div>
        </div>

        <div className={styles.betButtonContainer}>
          <BetButton
            title={t('bet')}
            titles={{ bet: t('bet'), cashout: t('cashout') }}
            value={betAmount.toFixed(2)}
            cashoutValue={cashoutValue}
            currency={currency}
            variant={hasActiveBet ? 'cashout' : 'bet'}
            disabled={disabled}
            onClick={handleBetAction}
            className={styles.betButtonCustom}
          />
        </div>
      </div>

      <div className={styles.footerSection}>
        <div className={styles.switchersGroup}>
          <Switcher label={t('autoBet')} enabled={autoBet} disabled={disabled} onChange={setAutoBet} />
          <Switcher
            label={t('autoCashOut')}
            enabled={autoCashOutEnabled}
            disabled={disabled}
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
