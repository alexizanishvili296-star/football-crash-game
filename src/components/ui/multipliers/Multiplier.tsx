import styles from './Multiplier.module.css';
import { useTranslation } from 'react-i18next';
import { formatMultiplier } from '@utils/format';

type MultiplierVariant =
  | 'low'
  | 'medium'
  | 'high'
  | 'veryHigh'
  | 'extreme';

interface MultiplierProps {
  odd: number;
  className?: string;
}

const getVariant = (odd: number): MultiplierVariant => {
  if (odd < 2) return 'low';
  if (odd < 10) return 'medium';
  if (odd < 20) return 'high';
  if (odd < 50) return 'veryHigh';

  return 'extreme';
};

export default function Multiplier({
  odd,
  className,
}: MultiplierProps) {
  const variant = getVariant(odd);
  const { i18n } = useTranslation();

  return (
    <div
      className={[
        styles.multiplier,
        styles[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
        <span className={styles.value}>
            {formatMultiplier(odd, i18n.language)}
        </span>
    </div>
  );
}
