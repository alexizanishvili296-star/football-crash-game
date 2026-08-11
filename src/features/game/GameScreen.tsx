import { useTranslation } from 'react-i18next';

import gameBackground from '@assets/gameBg.png';
import { useGame } from './GameContext';
import styles from './GameScreen.module.css';

export default function GameScreen() {
  const { t } = useTranslation();
  const { phase, multiplier, countdownProgress, crashMultiplier } = useGame();
  const isBetting = phase === 'betting';

  return (
    <div className={styles.screen} style={{ backgroundImage: `url(${gameBackground})` }}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        {isBetting ? (
          <>
            <p className={styles.status}>{t('placeYourBet', { seconds: Math.max(0, Math.ceil((1 - countdownProgress) * 7)) })}</p>
            <div className={styles.loader} aria-label={t('nextRoundLoading')}>
              <div className={styles.loaderFill} style={{ transform: `scaleX(${countdownProgress})` }} />
            </div>
          </>
        ) : (
          <>
            <p className={[styles.status, phase === 'crashed' ? styles.crashed : ''].filter(Boolean).join(' ')}>
              {phase === 'crashed' ? t('crashed') : t('flying')}
            </p>
            <strong className={[styles.multiplier, phase === 'crashed' ? styles.multiplierCrashed : ''].filter(Boolean).join(' ')}>
              {(crashMultiplier ?? multiplier).toFixed(2)}x
            </strong>
          </>
        )}
      </div>
    </div>
  );
}
