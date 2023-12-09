import { Routes, Route } from 'react-router-dom'
import './App.css'
import { router } from './routes'
import MainLayout from './layouts/MainLayout'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<div>Home</div>} />
          <Route path="about" element={<div>About us</div>} />
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
