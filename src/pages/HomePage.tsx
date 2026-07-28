import React from 'react'
import BetControlPanel from '../features/betControlPanel'
import { BetsBoard } from '../features/betsBoard/BetsBoard'
import { MultiplierHistory } from '../features/multiplierHistory/components/MultiplierHistory'
import styles from './HomePage.module.css'

export const HomePage: React.FC = () => {
  return (
    <div className={styles.pageGrid}>
      {/* 1. Multiplier History Bar */}
      <section className={styles.historyArea} aria-label="Multiplier History">
        <MultiplierHistory />
      </section>

      {/* 2. Game Canvas Container (Phaser mounted here) */}
      <section className={styles.gameStageArea} aria-label="Game Screen">
        <div id="phaser-game-container" style={{ width: '100%', height: '100%' }}>
          {/* Phaser canvas mounts inside this element */}
        </div>
      </section>

      {/* 3. Dual Betting Control Panels */}
      <section className={styles.controlsArea} aria-label="Betting Controls">
        <BetControlPanel panelId="panel-1" />
        <BetControlPanel panelId="panel-2" />
      </section>

      {/* 4. Real-time Bets Board Sidebar/Section */}
      <aside className={styles.betsArea} aria-label="Live Bets and History">
        <BetsBoard />
      </aside>
    </div>
  )
}

export default HomePage