import { useState, type ChangeEvent } from 'react';

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
  ariaLabel?: string;
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
  ariaLabel,
}: NumberInputProps) {
  const [inputValue, setInputValue] = useState(value.toFixed(decimals));
  const [prevValue, setPrevValue] = useState(value);

  if (value !== prevValue) {
    setPrevValue(value);
    setInputValue(value.toFixed(decimals));
  }

  const commitValue = () => {
    const parsedValue = Number(inputValue.replace(',', '.'));
    if (!Number.isFinite(parsedValue)) {
      setInputValue(value.toFixed(decimals));
      return;
    }

    const roundedValue = Number(Math.min(max, Math.max(min, parsedValue)).toFixed(decimals));
    setInputValue(roundedValue.toFixed(decimals));
    if (roundedValue !== value) onChange(roundedValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(min, value - step);
    onChange(Number(newValue.toFixed(decimals)));
  };

  const handleIncrement = () => {
    const newValue = Math.min(max, value + step);
    onChange(Number(newValue.toFixed(decimals)));
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
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
          value={inputValue}
          step={step}
          min={min}
          max={max}
          disabled={disabled}
          inputMode="decimal"
          aria-label={ariaLabel}
          onChange={handleInputChange}
          onBlur={commitValue}
          onKeyDown={(event) => {
            if (event.key === 'Enter') event.currentTarget.blur();
          }}
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