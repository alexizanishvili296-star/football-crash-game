import { useState } from "react";
import styles from "./BetButton.module.css";

type ButtonVariant = "bet" | "cashout" | "freebet" | "cancel";

interface ButtonProps {
  title: string;
  value: string | number;
  currency?: string;
  variant?: ButtonVariant;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function BetButton({
  title,
  value,
  currency = "USD",
  variant = "freebet",
  disabled = false,
  onClick,
  className,
}: ButtonProps) {

  const [buttonVariant, ] = useState<ButtonVariant>(variant);

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={[
            styles.button,
            styles[buttonVariant],
            className,
        ].filter(Boolean).join(" ")}
    >

      <div className={styles.content}>
        <span className={styles.title}>{title}</span>
        <div className={styles.row}>
            <span className={styles.value}>{value}</span>
            <span className={styles.value}>{currency}</span>
        </div>
      </div>
      
    </button>
  );
}