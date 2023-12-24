import { FC, ReactNode } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthAccess } from '../../hooks/useAuthAccess'

interface IProtectedRouteProps {
  redirectPath?: string
  children?: ReactNode
}

export const ProtectedRoute: FC<IProtectedRouteProps> = ({
  redirectPath = '/signin',
  children,
}) => {
  const isAuthenticated = useAuthAccess()

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />
  }

  return children ? children : <Outlet />
}
