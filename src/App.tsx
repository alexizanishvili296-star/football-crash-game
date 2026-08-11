
import { usePathLanguage } from './i18n/usePathLanguage'

import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import { GameProvider } from './features/game/GameContext'

import './App.css'

function App() {
  usePathLanguage()

  return (
    <>
      <GameProvider>
        <MainLayout>
          <HomePage />
        </MainLayout>
      </GameProvider>
    </>
  )
}

export default App
