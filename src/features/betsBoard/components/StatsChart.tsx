import React from 'react';

import styles from './StatsChart.module.css';
import { useGame } from '@features/game/GameContext';

interface ChartItem {
  label: string;
  percentage: number;
}

const ranges = [
  { label: '1.00x', min: 1, max: 1 },
  { label: '1.01x – 1.99x', min: 1.01, max: 1.99 },
  { label: '2.00x – 5.99x', min: 2, max: 5.99 },
  { label: '6.00x – 25.99x', min: 6, max: 25.99 },
  { label: '26.00x+', min: 26, max: Number.POSITIVE_INFINITY },
    { label: '1.00x', min: 1, max: 1 },
  { label: '1.01x – 1.99x', min: 1.01, max: 1.99 },
  { label: '2.00x – 5.99x', min: 2, max: 5.99 },
  { label: '6.00x – 25.99x', min: 6, max: 25.99 },
  { label: '26.00x+', min: 26, max: Number.POSITIVE_INFINITY },
    { label: '1.00x', min: 1, max: 1 },
  { label: '1.01x – 1.99x', min: 1.01, max: 1.99 },
  { label: '2.00x – 5.99x', min: 2, max: 5.99 },
  { label: '6.00x – 25.99x', min: 6, max: 25.99 },
  { label: '26.00x+', min: 26, max: Number.POSITIVE_INFINITY },
    { label: '1.00x', min: 1, max: 1 },
  { label: '1.01x – 1.99x', min: 1.01, max: 1.99 },
  { label: '2.00x – 5.99x', min: 2, max: 5.99 },
  { label: '6.00x – 25.99x', min: 6, max: 25.99 },
  { label: '26.00x+', min: 26, max: Number.POSITIVE_INFINITY },
    { label: '1.00x', min: 1, max: 1 },
  { label: '1.01x – 1.99x', min: 1.01, max: 1.99 },
  { label: '2.00x – 5.99x', min: 2, max: 5.99 },
  { label: '6.00x – 25.99x', min: 6, max: 25.99 },
  { label: '26.00x+', min: 26, max: Number.POSITIVE_INFINITY },
    { label: '1.00x', min: 1, max: 1 },
  { label: '1.01x – 1.99x', min: 1.01, max: 1.99 },
  { label: '2.00x – 5.99x', min: 2, max: 5.99 },
  { label: '6.00x – 25.99x', min: 6, max: 25.99 },
  { label: '26.00x+', min: 26, max: Number.POSITIVE_INFINITY },
    { label: '1.00x', min: 1, max: 1 },
  { label: '1.01x – 1.99x', min: 1.01, max: 1.99 },
  { label: '2.00x – 5.99x', min: 2, max: 5.99 },
  { label: '6.00x – 25.99x', min: 6, max: 25.99 },
  { label: '26.00x+', min: 26, max: Number.POSITIVE_INFINITY },
];

export const StatsChart: React.FC = () => {
  const { multiplierHistory } = useGame();
  const total = multiplierHistory.length || 1;
  const chartData: ChartItem[] = ranges.map(({ label, min, max }) => ({
    label,
    percentage: Math.round(multiplierHistory.filter((multiplier) => multiplier >= min && multiplier <= max).length / total * 100),
  }));
  return (
    <div className={styles.chartContainer}>
      {chartData.map((item, index) => (
        <div key={index} className={styles.chartRow}>
          <div className={styles.rowInfo}>
            <span className={styles.label}>{item.label}</span>
            <span className={styles.percentage}>{item.percentage}%</span>
          </div>
          
          <div className={styles.progressBarBg}>
            <div 
              className={styles.progressBarFill} 
              style={{ width: `${item.percentage}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
