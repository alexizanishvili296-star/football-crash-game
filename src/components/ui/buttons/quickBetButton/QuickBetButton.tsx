import styles from "./QuickBetButton.module.css";

interface QuickBetButtonProps {
  amount: number;
  currency?: string;
  onClick: (amount: number) => void;
  disabled?: boolean;
}

export default function QuickBetButton({
  amount,
  onClick,
  disabled = false,
}: QuickBetButtonProps) {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={() => onClick(amount)}
      disabled={disabled}
    >
      {amount.toFixed(2)}
    </button>
  );
}
