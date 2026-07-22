import { useState } from "react";
// import BetButton from "./BetButton";
// import Switcher from "./Switcher";
// import NumberInput from "./NumberInput";
// import QuickBetButton from "./QuickBetButton";
import styles from "./BetControlPanel.module.css";
import NumberInput from "../../components/ui/inputs/numberInput";
import BetButton from "../../components/ui/buttons/betButton";
import QuickBetButton from "../../components/ui/buttons/quickBetButton";
import Switcher from "../../components/ui/inputs/switcher";

interface BetControlPanelProps {
  currency?: string;
  presetAmounts?: number[];
  onBetSubmit?: (amount: number, isAutoBet: boolean, autoCashOutMultiplier?: number) => void;
  disabled?: boolean;
}

export default function BetControlPanel({
  currency = "USD",
  presetAmounts = [2.0, 2.0, 2.0, 2.0],
  onBetSubmit,
  disabled = false,
}: BetControlPanelProps) {
  const [betAmount, setBetAmount] = useState<number>(1.0);
  const [autoBet, setAutoBet] = useState<boolean>(false);
  const [autoCashOutEnabled, setAutoCashOutEnabled] = useState<boolean>(false);
  const [cashOutMultiplier, setCashOutMultiplier] = useState<number>(2.0);

  const handleBetClick = () => {
    if (onBetSubmit) {
      onBetSubmit(
        betAmount,
        autoBet,
        autoCashOutEnabled ? cashOutMultiplier : undefined
      );
    }
  };

  return (
    <div className={styles.panel}>
      {/* Top Left: Main Amount Counter */}
      <div className={styles.amountSection}>
        <NumberInput
          value={betAmount}
          step={0.5}
          min={0.1}
          decimals={2}
          disabled={disabled}
          onChange={setBetAmount}
        />
      </div>

      {/* Top Right: Bet Action Button */}
      <div className={styles.actionSection}>
        <BetButton
          title="cashout"
          value={betAmount.toFixed(2)}
          currency={currency}
          variant="cashout"
          disabled={disabled}
          onClick={handleBetClick}
          className={styles.betButtonCustom}
        />
      </div>

      {/* Middle Left: Quick Amount Presets */}
      <div className={styles.presetsSection}>
        {presetAmounts.map((amt, idx) => (
          <QuickBetButton
            key={idx}
            amount={amt}
            disabled={disabled}
            onClick={(selectedAmount) => setBetAmount(selectedAmount)}
          />
        ))}
      </div>

      {/* Bottom Controls Bar */}
      <div className={styles.footerSection}>
        <div className={styles.switchersGroup}>
          <Switcher
            label="Auto Bet"
            defaultEnabled={autoBet}
            disabled={disabled}
            onChange={setAutoBet}
          />
          <Switcher
            label="Auto Cash Out"
            defaultEnabled={autoCashOutEnabled}
            disabled={disabled}
            onChange={setAutoCashOutEnabled}
          />
        </div>

        {/* Multiplier control for Auto Cash Out */}
        <div className={styles.multiplierSection}>
          <NumberInput
            value={cashOutMultiplier}
            step={0.1}
            min={1.01}
            suffix="x"
            size="small"
            decimals={2}
            disabled={disabled || !autoCashOutEnabled}
            onChange={setCashOutMultiplier}
          />
        </div>
      </div>
    </div>
  );
}