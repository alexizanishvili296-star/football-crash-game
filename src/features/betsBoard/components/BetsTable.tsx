import React from 'react';
import type { Bet, TabType } from '../types';
import styles from './BetsTable.module.css';
import { useTranslation } from 'react-i18next';

interface BetsTableProps {
  bets: Bet[];
  activeTab: TabType;
}

export const BetsTable: React.FC<BetsTableProps> = ({ bets, activeTab }) => {

  const { t } = useTranslation();

  const isMyBetsTab = activeTab === 'myBets';

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.headerRow}>
            <th className={`${styles.th} ${styles.thLeft}`}>{t('player')}</th>
            <th className={`${styles.th} ${styles.thCenter}`}>{t('bet')} (USD)</th>
            <th className={`${styles.th} ${styles.thRight}`}>{t('cashout')} (USD)</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {bets.map((bet) => {
            const isWon = bet.cashout !== undefined && bet.cashout > 0;
            const isMyBet = bet.isCurrentUser;

            let rowClass = styles.row;
            if (isMyBet && isWon) {
              rowClass = `${styles.row} ${styles.myWonRow}`;
            } else if (isMyBetsTab) {
              rowClass = `${styles.row} ${styles.myPendingInMyBets}`;
            } else if (isMyBet) {
              rowClass = `${styles.row} ${styles.myPendingRow}`;
            } else if (isWon) {
              rowClass = `${styles.row} ${styles.otherWonRow}`;
            }

            return (
              <tr key={bet.id} className={rowClass}>
                <td className={`${styles.td} ${styles.playerCol}`}>
                  {isMyBetsTab ? (
                    <div className={styles.dateTimeContainer}>
                      <span className={styles.dateText}>{bet.date}</span>
                      <span className={styles.timeText}>{bet.time}</span>
                    </div>
                  ) : (
                    bet.player
                  )}
                </td>

                <td className={`${styles.td} ${styles.betCol}`}>
                  <div className={styles.betCellContainer}>
                    <span className={styles.betAmount}>
                      {bet.betAmount.toFixed(2)}
                    </span>
                    {bet.multiplier && (
                      <span className={styles.multiplierBadge}>
                        {bet.multiplier.toFixed(2)}x
                      </span>
                    )}
                  </div>
                </td>

                <td className={`${styles.td} ${styles.cashoutCol}`}>
                  <div className={styles.cashoutCellContainer}>
                    {isWon ? (
                      <>
                        <span className={styles.cashoutAmount}>
                          {bet.cashout?.toFixed(3)}
                        </span>

                        {activeTab === "myBets" && (
                          <svg
                            className={styles.shieldIcon}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path 
                                d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" 
                                stroke="#10af44" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            />
                            <path 
                                d="m9 11 2 2 4-4" 
                                stroke="#10af44" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            />
                          </svg>)
                        }
                      </>
                    ) : (
                      <span className={styles.noCashout}>-</span>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};