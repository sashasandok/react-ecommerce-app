import { Link } from 'react-router-dom'
// store
import { useAuthStore } from '../../stores/auth/store'
// styles
import styles from './AppHeader.module.scss'
import { UserMenu } from '../UserMenu'

const AppHeader = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  return (
    <header className={styles.HeaderWrapper}>
      <ul className={styles.NavList}>
        {isAuthenticated ? (
          <li>
            <Link to="/">
              <div>Home</div>
            </Link>
          </li>
        ) : null}
        {isAuthenticated ? (
          <li>
            <Link to="/about">
              <div>About us</div>
            </Link>
          </li>
        ) : null}
        {/* <li>
          <Link to="/signup">
            <div>Sign Up</div>
          </Link>
        </li> */}
      </ul>
      {isAuthenticated ? (
        <ul className={styles.UserInfo}>
          <UserMenu />
        </ul>
      ) : (
        <ul className={styles.Auth}>
          <li>
            <Link to="/signin">
              <div>Sign In</div>
            </Link>
          </li>
        </ul>
      )}
    </header>
  )
}

export default AppHeader
