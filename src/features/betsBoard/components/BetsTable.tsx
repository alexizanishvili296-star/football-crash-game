import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '@utils/format';

import type { Bet, TabType } from '../types';

import TickIcon from "@assets/tick.svg?react"

import styles from './BetsTable.module.css';

interface BetsTableProps {
  bets: Bet[];
  activeTab: TabType;
}

export const BetsTable: React.FC<BetsTableProps> = ({ bets, activeTab }) => {

  const { t, i18n } = useTranslation();

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
                    <span className={styles.betAmount}>{formatCurrency(bet.betAmount, 'USD', i18n.language)}</span>
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
                          {formatCurrency(bet.cashout ?? 0, 'USD', i18n.language)}
                        </span>

                        {activeTab === "myBets" && <TickIcon />}
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
