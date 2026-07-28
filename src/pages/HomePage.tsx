import BetControlPanel from '../features/betControlPanel'
import { BetsBoard } from '../features/betsBoard/BetsBoard'
import { MultiplierHistory } from '../features/multiplierHistory/components/MultiplierHistory'

import styles from './HomePage.module.css'

const HomePage = () => {
  return (
    <div>
        <BetsBoard />
        <div className={`${styles.betControlPanelsContainer}`}>
            <BetControlPanel />
            <BetControlPanel />
        </div>

        <MultiplierHistory />
    </div>
  )
}

export default HomePage