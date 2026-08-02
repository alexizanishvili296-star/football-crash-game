import React from "react";

import styles from "./NumberInput.module.css";

interface NumberInputProps {
  value: number;
  step?: number;
  min?: number;
  max?: number;
  suffix?: string;
  decimals?: number;
  disabled?: boolean;
  size?: "default" | "small";
  onChange: (value: number) => void;
  className?: string;
}

export default function NumberInput({
  value,
  step = 1,
  min = 0,
  max = Infinity,
  suffix = "",
  decimals = 2,
  disabled = false,
  size = "default",
  onChange,
  className,
}: NumberInputProps) {
  const handleDecrement = () => {
    const newValue = Math.max(min, value - step);
    onChange(Number(newValue.toFixed(decimals)));
  };

  const handleIncrement = () => {
    const newValue = Math.min(max, value + step);
    onChange(Number(newValue.toFixed(decimals)));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseFloat(e.target.value);
    if (!isNaN(num)) {
      onChange(Number(num.toFixed(decimals)));
    }
  };

  return (
    <div
      className={[
        styles.container,
        styles[size],
        disabled && styles.disabled,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <button
        type="button"
        className={styles.stepButton}
        onClick={handleDecrement}
        disabled={disabled || value <= min}
        aria-label="Decrease value"
      >
        −
      </button>

      <div className={styles.inputWrapper}>
        <input
          type="number"
          className={styles.input}
          value={value}
          step={step}
          min={min}
          max={max}
          disabled={disabled}
          onChange={handleInputChange}
        />
        {suffix && <span className={styles.suffix}>{suffix}</span>}
      </div>

      <button
        type="button"
        className={styles.stepButton}
        onClick={handleIncrement}
        disabled={disabled || value >= max}
        aria-label="Increase value"
      >
        +
      </button>
    </div>
  );
}