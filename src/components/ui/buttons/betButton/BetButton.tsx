import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import styles from "./BetButton.module.css";

export type ButtonVariant = "bet" | "cashout" | "freebet" | "cancel";

interface ButtonProps {
  title: string;
  titles?: Partial<Record<ButtonVariant, string>>;
  value: string | number;
  cashoutValue?: string | number;
  currency?: string;
  variant?: ButtonVariant;
  disabled?: boolean;
  onClick?: () => void;
  onVariantChange?: (variant: ButtonVariant) => void;
  className?: string;
}

export interface BetButtonHandle {
  toggleVariant: () => ButtonVariant;
}

const BetButton = forwardRef<BetButtonHandle, ButtonProps>(function BetButton({
  title,
  titles,
  value,
  cashoutValue,
  currency = "USD",
  variant = "freebet",
  disabled = false,
  onClick,
  onVariantChange,
  className,
}, ref) {
  const [buttonVariant, setButtonVariant] = useState<ButtonVariant>(variant);
  const buttonVariantRef = useRef<ButtonVariant>(variant);

  useImperativeHandle(ref, () => ({
    toggleVariant: () => {
      const nextVariant = buttonVariantRef.current === "bet" ? "cashout" : "bet";

      buttonVariantRef.current = nextVariant;
      setButtonVariant(nextVariant);
      onVariantChange?.(nextVariant);

      return nextVariant;
    },
  }), [onVariantChange]);

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
        <span className={styles.title}>{titles?.[buttonVariant] ?? title}</span>
        <div className={styles.row}>
            <span className={styles.value}>
              {buttonVariant === "cashout" ? cashoutValue ?? value : value}
            </span>
            <span className={styles.value}>{currency}</span>
        </div>
      </div>
      
    </button>
  );
});

export default BetButton;
