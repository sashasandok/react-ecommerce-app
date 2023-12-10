import { Outlet } from 'react-router-dom'
import styles from './MainLayout.module.scss'
import AppHeader from '../components/AppHeader'

const MainLayout = () => {
  return (
    <div className={styles.MainLayoutWrapper}>
      <AppHeader />
      <Outlet />
    </div>
  )
}

export default MainLayout
