import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import OptimoLogo from '@assets/optimoPlayLogo.svg?react'

import styles from './Footer.module.css';

export interface FooterProps {
  connectionLabel?: string;
  className?: string;
}

const SignalBars: React.FC = () => (
  <div className={styles.signalIcon} aria-hidden='true'>
    <span className={styles.signalBar} />
    <span className={styles.signalBar} />
    <span className={styles.signalBar} />
    <span className={styles.signalBar} />
  </div>
);

export const Footer: React.FC<FooterProps> = ({
  connectionLabel,
  className = '',
}) => {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const updateTime = () => setCurrentTime(new Date());

    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <footer className={`${styles.footer} ${className}`}>
      <div className={styles.brand}>
        <span className={styles.poweredBy}>{t('poweredBy')}</span>
        <div className={styles.logoWrapper}>
          <span className={styles.brandName}>
            <OptimoLogo />
          </span>
        </div>
      </div>

      <div className={styles.status}>
        <div className={styles.network} aria-label={t('networkStatusConnected')}>
          <SignalBars />
          <span>{connectionLabel ?? t('networkConnection')}</span>
        </div>

        <div className={styles.divider} role='separator' />

        <time className={styles.time} dateTime={currentTime?.toISOString()}>
          {currentTime
            ? new Intl.DateTimeFormat(i18n.language, {
                hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
              }).format(currentTime)
            : '00:00:00'}
        </time>
      </div>
    </footer>
  );
};

export default Footer;