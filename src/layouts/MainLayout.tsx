import React from 'react'

import Header from '@components/shell/header'
import Footer from '@components/shell/footer/Footer'

import styles from './MainLayout.module.css'

interface MainLayoutProps {
  children: React.ReactNode
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className={styles.layoutMainContainer}>
      <div className={styles.layoutWrapper}>
        <Header />
        <main className={styles.mainContent}>{children}</main>
        <Footer />
      </div>
    </div>
  )
}

export default MainLayout