
import './App.css'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import { usePathLanguage } from './i18n/usePathLanguage'


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
