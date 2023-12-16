import { Routes, Route } from 'react-router-dom'
import { router } from './routes'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home/Home'
import { ProtectedRoute } from './components/ProtectedRoute'
import './App.module.scss'
import Register from './pages/Register'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route
            path="about"
            element={
              <ProtectedRoute isAllowed={false}>
                <div>About us</div>
              </ProtectedRoute>
            }
          />
          <Route
            path="register"
            element={
              <ProtectedRoute isAllowed={true}>
                <Register />
              </ProtectedRoute>
            }
          />
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
