import styles from './QuickBetButton.module.css';

interface QuickBetButtonProps {
  amount: number;
  currency?: string;
  onClick: (amount: number) => void;
  disabled?: boolean;
  ariaLabel?: string;
}

export default function QuickBetButton({
  amount,
  onClick,
  disabled = false,
  ariaLabel,
}: QuickBetButtonProps) {
  return (
    <button
      type='button'
      className={styles.button}
      onClick={() => onClick(amount)}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {amount.toFixed(2)}
    </button>
  );
}
