import styles from './AppHeader.module.scss'
import { Link } from 'react-router-dom'

const AppHeader = () => {
  return (
    <header className={styles.HeaderWrapper}>
      <ul className={styles.NavList}>
        <li>
          <Link to="/">
            <div>Public Page</div>
          </Link>
        </li>
        <li>
          <Link to="/about">
            <div>Protected Page</div>
          </Link>
        </li>{' '}
        <li>
          <Link to="/register">
            <div>Register</div>
          </Link>
        </li>
        <li>
          <Link to="/no-match">
            <div>No Match</div>
          </Link>
        </li>
      </ul>
    </header>
  )
}

export default AppHeader
