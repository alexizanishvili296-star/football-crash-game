import { useState, type FC, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import Switcher from '@components/ui/inputs/switcher';

import styles from './SettingsDropdown.module.css';

const Icons = {
  Sound: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>,
  Music: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>,
  Animation: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>,
  Fair: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>,
  Info: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>,
  FreeBet: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7h18a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z"/><path d="M7 11V7"/><path d="M7 17v-4"/></svg>,
  Limits: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20"/><path d="m18 16-6-6-6 6"/></svg>,
  Chat: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
};

interface MenuItemProps {
  icon: ReactNode;
  label: string;
  action?: ReactNode;
  hasDivider?: boolean;
}

const MenuItem: FC<MenuItemProps> = ({ icon, label, action }) => (
  <div className={styles.item}>
    <div className={styles.itemLeft}>
      <span className={styles.icon}>{icon}</span>
      <span className={styles.label}>{label}</span>
    </div>
    {action && <div className={styles.action}>{action}</div>}
  </div>
);

export const SettingsDropdown: FC = () => {
  const { t } = useTranslation();

  // State management for individual audio/visual toggles
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(true);
  const [isMusicEnabled, setIsMusicEnabled] = useState<boolean>(false);
  const [isAnimationEnabled, setIsAnimationEnabled] = useState<boolean>(false);

  return (
    <div className={styles.dropdown} role="menu">
      <MenuItem
        icon={<Icons.Sound />}
        label={t('sound')}
        action={
          <Switcher
            enabled={isSoundEnabled}
            onChange={setIsSoundEnabled}
          />
        }
      />
      <MenuItem
        icon={<Icons.Music />}
        label={t('music')}
        action={
          <Switcher
            enabled={isMusicEnabled}
            onChange={setIsMusicEnabled}
          />
        }
      />
      <MenuItem
        icon={<Icons.Animation />}
        label={t('animation')}
        action={
          <Switcher
            enabled={isAnimationEnabled}
            onChange={setIsAnimationEnabled}
          />
        }
      />

      <MenuItem icon={<Icons.Fair />} label={t('provablyFair')} />
      <MenuItem icon={<Icons.Info />} label={t('howToPlay')} />
      <MenuItem icon={<Icons.FreeBet />} label={t('freeBet')} />
      <MenuItem icon={<Icons.Limits />} label={t('limits')} />
      <MenuItem icon={<Icons.Chat />} label={t('chat')} />
    </div>
  );
};

SettingsDropdown.displayName = 'SettingsDropdown';