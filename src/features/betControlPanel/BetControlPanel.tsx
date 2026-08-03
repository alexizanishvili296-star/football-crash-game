import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import NumberInput from "@components/ui/inputs/numberInput";
import BetButton, {
  type BetButtonHandle,
  type ButtonVariant,
} from "@components/ui/buttons/betButton";
import QuickBetButton from "@components/ui/buttons/quickBetButton";
import Switcher from "@components/ui/inputs/switcher";

import styles from "./BetControlPanel.module.css";

const DEFAULT_BET_AMOUNT = 1;

interface BetControlPanelProps {
  panelId?: string;
  currency?: string;
  presetAmounts?: number[];
  currentMultiplier?: number;
  onBetSubmit?: (amount: number, isAutoBet: boolean, autoCashOutMultiplier?: number) => void;
  disabled?: boolean;
}

export default function BetControlPanel({
  panelId,
  currency = "USD",
  presetAmounts = [2.0, 5.0, 10.0, 20.10],
  currentMultiplier = 1,
  onBetSubmit,
  disabled = false,
}: BetControlPanelProps) {
  const [betAmount, setBetAmount] = useState<number>(DEFAULT_BET_AMOUNT);
  const [autoBet, setAutoBet] = useState<boolean>(false);
  const [autoCashOutEnabled, setAutoCashOutEnabled] = useState<boolean>(false);
  const [cashOutMultiplier, setCashOutMultiplier] = useState<number>(2.0);
  const [placedBetAmount, setPlacedBetAmount] = useState<number | null>(null);
  const betButtonRef = useRef<BetButtonHandle>(null);

  const {t} = useTranslation();

  const handleBetClick = () => {
    betButtonRef.current?.toggleVariant();
  };

  const handleButtonVariantChange = (nextVariant: ButtonVariant) => {
    if (nextVariant !== "cashout") {
      setPlacedBetAmount(null);
      setBetAmount(DEFAULT_BET_AMOUNT);
      return;
    }

    setPlacedBetAmount(betAmount);

    if (onBetSubmit) {
      onBetSubmit(
        betAmount,
        autoBet,
        autoCashOutEnabled ? cashOutMultiplier : undefined
      );
    }
  };

  const cashoutValue = ((placedBetAmount ?? betAmount) * currentMultiplier).toFixed(2);

  return (
    <div  className={styles.panel} key={panelId} >
      <div className={styles.actionSection}>
        <div className={styles.amountSectionContainer}>
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
        </div>


        <div className={styles.betButtonContainer}>
          <BetButton
            ref={betButtonRef}
            title={t("bet")}
            titles={{
              bet: t("bet"),
              cashout: t("cashout"),
            }}
            value={betAmount.toFixed(2)}
            cashoutValue={cashoutValue}
            currency={currency}
            variant="bet"
            disabled={disabled}
            onClick={handleBetClick}
            onVariantChange={handleButtonVariantChange}
            className={styles.betButtonCustom}
          />
        </div>

      </div>


      <div className={styles.footerSection}>
        <div className={styles.switchersGroup}>
          <Switcher
            label={t("autoBet")}
            defaultEnabled={autoBet}
            disabled={disabled}
            onChange={setAutoBet}
          />
          <Switcher
            label={t("autoCashOut")}
            defaultEnabled={autoCashOutEnabled}
            disabled={disabled}
            onChange={setAutoCashOutEnabled}
          />
        </div>

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
