import React from 'react'

import { MultiplierHistory } from '@features/multiplierHistory/components/MultiplierHistory'
import { BetsBoard } from '@features/betsBoard/BetsBoard'
import BetControlPanel from '@features/betControlPanel'
import { useCurrentMultiplier } from '@features/game/multiplierStore'

import styles from './HomePage.module.css'

export const HomePage: React.FC = () => {
  const currentMultiplier = useCurrentMultiplier()

  return (
    <div className={styles.pageGrid}>

      <aside className={styles.betsArea} aria-label='Live Bets and History'>
        <BetsBoard />
      </aside>

      <div className={styles.mainContent}>
        <section className={styles.historyArea} aria-label='Multiplier History'>
          <MultiplierHistory />
        </section>

        <section className={styles.gameStageArea} aria-label='Game Screen'>
          <div id='phaser-game-container' style={{ width: '100%', height: '100%' }}>
            {/*
              Mount the Phaser game here. When its odd changes, call
              setCurrentMultiplier(odd) from @features/game/multiplierStore.
            */}
          </div>
        </section>

        <section className={styles.controlsArea} aria-label='Betting Controls'>
          <BetControlPanel panelId='panel-1' currentMultiplier={currentMultiplier} />
          <BetControlPanel panelId='panel-2' currentMultiplier={currentMultiplier} />
        </section>
      </div>
    </div>
  )
}

export default HomePage