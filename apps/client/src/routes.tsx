import { createBrowserRouter } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'

export const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    Component: MainLayout,
  },
  {
    id: 'protected',
    path: '/protected',
    Component: MainLayout,
  },
])
