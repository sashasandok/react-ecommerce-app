import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
// types
import { IState } from '../../redux/types'
// ui components
import { Button } from '@chakra-ui/react'
// api
import authApi from '../../api/auth'
// store
import { logout } from '../../redux/auth/slice'
// styles
import styles from './AppHeader.module.scss'

const AppHeader = () => {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state: IState) => state.auth)

  const onUserLogout = async () => {
    try {
      const res = await authApi.logout()
      if (res.status === 200) {
        dispatch(logout())
      }
    } catch (error) {
      console.log('error', error)
    }
  }

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
        <li>
          <Link to="/signup">
            <div>Sign Up</div>
          </Link>
        </li>
        <li>
          <Link to="/signin">
            <div>Sign In</div>
          </Link>
        </li>
        <li>
          <Link to="/no-match">
            <div>No Match</div>
          </Link>
        </li>
        {isAuthenticated ? (
          <li>
            <Button onClick={onUserLogout}>Logout</Button>
          </li>
        ) : null}
      </ul>
      <ul className={styles.UserInfo}>
        <li>user profile</li>
      </ul>
    </header>
  )
}

export default AppHeader
