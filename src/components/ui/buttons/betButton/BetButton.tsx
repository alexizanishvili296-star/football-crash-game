import styles from './BetButton.module.css';

export type ButtonVariant = 'bet' | 'cashout' | 'freebet' | 'cancel';

interface ButtonProps {
  title: string;
  titles?: Partial<Record<ButtonVariant, string>>;
  value: string | number;
  cashoutValue?: string | number;
  currency?: string;
  variant: ButtonVariant;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

/** A controlled presentation component; the game state owns its variant. */
export default function BetButton({
  title,
  titles,
  value,
  cashoutValue,
  currency = 'USD',
  variant,
  disabled = false,
  onClick,
  className,
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={[styles.button, styles[variant], className].filter(Boolean).join(' ')}
    >
      <div className={styles.content}>
        <span className={styles.title}>{titles?.[variant] ?? title}</span>
        <div className={styles.row}>
          <span className={styles.value}>{variant === 'cashout' ? cashoutValue ?? value : value}</span>
          <span className={styles.value}>{currency}</span>
        </div>
      </div>
    </button>
  );
}
