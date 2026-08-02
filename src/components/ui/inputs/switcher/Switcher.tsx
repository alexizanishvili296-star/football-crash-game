import { useState } from "react";

import styles from "./Switcher.module.css";

interface SwitcherProps {
  label?: string;
  defaultEnabled?: boolean;
  disabled?: boolean;
  onChange?: (enabled: boolean) => void;
  className?: string;
}

export default function Switcher({
  label,
  defaultEnabled = false,
  disabled = false,
  onChange,
  className,
}: SwitcherProps) {
  const [isEnabled, setIsEnabled] = useState(defaultEnabled);

  const handleToggle = () => {
    if (disabled) return;

    const newValue = !isEnabled;

    setIsEnabled(newValue);
    onChange?.(newValue);
  };

  return (
    <div
      className={[
        styles.container,
        className,
      ].filter(Boolean).join(" ")}
    >
      {label && (
        <span className={styles.label}>{label}</span>
      )}

      <button
        type="button"
        role="switch"
        aria-checked={isEnabled}
        aria-label={label}
        disabled={disabled}
        onClick={handleToggle}
        className={[
          styles.switcher,
          isEnabled && styles.enabled,
        ].filter(Boolean).join(" ")}
      >
        <span className={styles.circle} />
      </button>
    </div>
  );
}