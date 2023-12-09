import { Link, Outlet } from 'react-router-dom'
import styles from './MainLayout.module.scss'

const MainLayout = () => {
  return (
    <div className={styles.MainLayoutWrapper}>
      <header className={styles.HeaderWrapper}>
        <ul className={styles.NavList}>
          <li>
            <Link to="/">Public Page</Link>
          </li>
          <li>
            <Link to="/about">Protected Page</Link>
          </li>
          <li>
            <Link to="/no-match">No Match</Link>
          </li>
        </ul>
      </header>

      <Outlet />
    </div>
  )
}

export default MainLayout
