

import './App.css'
import BetButton from './components/ui/buttons/betButton'
import Switcher from './components/ui/inputs/switcher'
import Multiplier from './components/ui/multipliers'
import BetControlPanel from './features/betControlPanel'
import { BetsBoard } from './features/betsBoard/BetsBoard'
import { MultiplierHistory } from './features/multiplierHistory/components/MultiplierHistory'


function App() {

  const handleBetSubmit = (
    amount: number,
    isAutoBet: boolean,
    autoCashOutMultiplier?: number
  ) => {
    console.log("Bet Placed:", {
      amount,
      isAutoBet,
      autoCashOutMultiplier,
    });
  };


  return (
    <>
      <BetButton
          title="cashout"
          value={25.67}
      />
      <Switcher
          label="Enable feature"
          defaultEnabled={true}
          onChange={(enabled) => console.log('Switcher is now', enabled)}
      />

      <MultiplierHistory />

      <Multiplier odd={2.21} />
      <Multiplier odd={0} />
      <Multiplier odd={21} />
      <Multiplier odd={55} />
      <Multiplier odd={12} />

      <BetsBoard />

      <BetControlPanel
        currency="USD"
        presetAmounts={[2.0, 5.0, 10.0, 25.0]}
        onBetSubmit={handleBetSubmit}
      />
    </>
  )
}

export default App
