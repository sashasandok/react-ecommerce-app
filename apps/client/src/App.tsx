import { Routes, Route } from 'react-router-dom'
import { router } from './routes'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home/Home'
import { ProtectedRoute } from './components/ProtectedRoute'
import './App.module.scss'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import { useSelector } from 'react-redux'
import { IState } from './redux/types'

const App = () => {
  const { isAuthenticated } = useSelector((state: IState) => state.auth)
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route
            path="about"
            element={
              <ProtectedRoute isAllowed={isAuthenticated}>
                <div>About us</div>
              </ProtectedRoute>
            }
          />
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="*" element={<div>No Match</div>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose())
}
