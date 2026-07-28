import Footer from '../components/shell/footer/indext'
import Header from '../components/shell/header'

import styles from "./MainLayout.module.css"

const MainLayout = ({children} : {children: React.ReactNode}) => {
  return (
    <div>
      <Header />
      <main className={`${styles.layoutContainer}`}>{children}</main>
      <Footer />
    </div>
  )
}

export default MainLayout