import React, { useState, useEffect } from 'react';

import styles from './Footer.module.css';

export interface FooterProps {
  connectionLabel?: string;
  className?: string;
}

const SignalBars: React.FC = () => (
  <div className={styles.signalIcon} aria-hidden="true">
    <span className={styles.signalBar} />
    <span className={styles.signalBar} />
    <span className={styles.signalBar} />
    <span className={styles.signalBar} />
  </div>
);

const OptimoLogo: React.FC = () => (
  <svg
    className={styles.logoIcon}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2a4 4 0 0 1 4 4c0 2.21-1.79 4-4 4s-4-1.79-4-4a4 4 0 0 1 4-4zm-4 9.5a5.5 5.5 0 0 1 8 0c1.5 1.5 2.5 3.5 2.5 5.5v2h-13v-2c0-2 1-4 2.5-5.5z" />
    <path d="M17.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
  </svg>
);

export const Footer: React.FC<FooterProps> = ({
  connectionLabel = 'Network Connection',
  className = '',
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setCurrentTime(`${hours} : ${minutes} : ${seconds}`);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <footer className={`${styles.footer} ${className}`}>
      <div className={styles.brand}>
        <span className={styles.poweredBy}>Powered by</span>
        <div className={styles.logoWrapper}>
          <OptimoLogo />
          <span className={styles.brandName}>
            Optimo<span className={styles.brandHighlight}>Play</span>
          </span>
        </div>
      </div>

      <div className={styles.status}>
        <div className={styles.network} aria-label="Network Status: Connected">
          <SignalBars />
          <span>{connectionLabel}</span>
        </div>

        <div className={styles.divider} role="separator" />

        <time className={styles.time} dateTime={currentTime}>
          {currentTime || '00 : 00 : 00'}
        </time>
      </div>
    </footer>
  );
};

export default Footer;