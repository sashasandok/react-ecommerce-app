import { Routes, Route } from 'react-router-dom'
// router
import { ProtectedRoute } from './components/ProtectedRoute'
import { router } from './routes'
// layouts
import MainLayout from './layouts/MainLayout'
// pages
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Home from './pages/Home/Home'
// styles
import './App.module.scss'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="about"
            element={
              <ProtectedRoute>
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
