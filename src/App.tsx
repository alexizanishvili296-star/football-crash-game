
import { usePathLanguage } from './i18n/usePathLanguage'

import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'

import './App.css'

function App() {
  usePathLanguage()

  return (
    <>
      <MainLayout>
        <HomePage />
      </MainLayout>
    </>
  )
}

export default App
