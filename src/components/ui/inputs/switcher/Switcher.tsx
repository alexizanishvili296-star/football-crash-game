import { useState } from 'react';

import styles from './Switcher.module.css';

interface SwitcherProps {
  label?: string;
  enabled?: boolean;
  defaultEnabled?: boolean;
  disabled?: boolean;
  onChange?: (enabled: boolean) => void;
  className?: string;
}

export default function Switcher({
  label,
  enabled,
  defaultEnabled = false,
  disabled = false,
  onChange,
  className,
}: SwitcherProps) {
  const [uncontrolledEnabled, setUncontrolledEnabled] = useState(defaultEnabled);
  const isControlled = enabled !== undefined;
  const isEnabled = isControlled ? enabled : uncontrolledEnabled;

  const handleToggle = () => {
    if (disabled) return;

    const newValue = !isEnabled;

    if (!isControlled) setUncontrolledEnabled(newValue);
    onChange?.(newValue);
  };

  return (
    <div
      className={[
        styles.container,
        className,
      ].filter(Boolean).join(' ')}
    >
      {label && (
        <span className={styles.label}>{label}</span>
      )}

      <button
        type='button'
        role='switch'
        aria-checked={isEnabled}
        aria-label={label}
        disabled={disabled}
        onClick={handleToggle}
        className={[
          styles.switcher,
          isEnabled && styles.enabled,
        ].filter(Boolean).join(' ')}
      >
        <span className={styles.circle} />
      </button>
    </div>
  );
}