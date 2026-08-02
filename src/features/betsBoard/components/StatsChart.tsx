import React from 'react';
import styles from './StatsChart.module.css';

interface ChartItem {
  label: string;
  percentage: number;
}

const MOCK_CHART_DATA: ChartItem[] = [
  { label: '1x', percentage: 5 },
  { label: '1.01x - 1.99x', percentage: 48 },
  { label: '2x - 5.99x', percentage: 31 },
  { label: '6x - 25.99x', percentage: 13 },
  { label: '26x - 100.99x', percentage: 3 },
  { label: '101x - 4 999.99x', percentage: 0 },
  { label: '5 000x', percentage: 0 },
];

export const StatsChart: React.FC = () => {
  return (
    <div className={styles.chartContainer}>
      {MOCK_CHART_DATA.map((item, index) => (
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