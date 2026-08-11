import React from 'react'

import { MultiplierHistory } from '@features/multiplierHistory/components/MultiplierHistory'
import { BetsBoard } from '@features/betsBoard/BetsBoard'
import BetControlPanel from '@features/betControlPanel'
import GameScreen from '@features/game/GameScreen'

import styles from './HomePage.module.css'

export const HomePage: React.FC = () => {
  return (
    <div className={styles.pageFlex}>

      <aside className={styles.betsArea} aria-label='Live Bets and History'>
        <BetsBoard />
      </aside>

      <div className={styles.mainContent}>
        <section className={styles.historyArea} aria-label='Multiplier History'>
          <MultiplierHistory />
        </section>

        <section className={styles.gameStageArea} aria-label='Game Screen'>
          <GameScreen />
        </section>

        <section className={styles.controlsArea} aria-label='Betting Controls'>
          <BetControlPanel panelId='panel-1' />
          <BetControlPanel panelId='panel-2' />
        </section>
      </div>
    </div>
  )
}

export default HomePage